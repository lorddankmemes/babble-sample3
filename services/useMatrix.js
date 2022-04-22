
import sdk from "matrix-js-sdk"
import { useContext } from 'react'
import crypto from 'crypto'
import axios from 'axios'
import { User } from "../providers/user-provider"
import { Chat } from "../providers/chat-provider"

function useMatrixOrg() {

    const userContext = useContext(User)
    const chatContext = useContext(Chat)

    const getUserID = () => {
        if (userContext?.state?.public_address == "") {
            return "manza.za"
        } else {
            return userContext?.state?.public_address
        }
    }

    const getAccessToken = () => {
        if (userContext?.state?.access_token == "") {
            return "syt_emFpbWFuemFfMg_QFsvMArxdffJkZJlVlBs_2X1qv9"
        } else {
            return userContext?.state?.access_token
        }
    }

    const client = sdk.createClient({
        baseUrl: "https://matrix-synapse.appserver.projectoasis.io/",
        accessToken: getAccessToken(),
        userId: "@" + getUserID() + ":matrix-synapse.appserver.projectoasis.io"
    })

    const createHMAC = async ({ username, password }) => {
        try {
            const generatedNonce = await axios.get('https://matrix-synapse.appserver.projectoasis.io/_synapse/admin/v1/register')
            const key = "f~hnQt-TIuH+b;jHSXA89+F;^uMn*Yl^9YQWjR@auWv6p*b9hW"
            console.log("GENERATED NONCE")
            console.log(generatedNonce?.data?.nonce)
            const cryptedHMAC = await crypto
                .createHmac('sha1', key)
                .update(generatedNonce?.data?.nonce)
                .update("\x00")
                .update(username)
                .update("\x00")
                .update(password)
                .update("\x00")
                .update("notadmin")
                .digest('hex')

            console.log(cryptedHMAC)
            console.log("CREATE HMAC SUCCESS")

            const generatedRegister = await axios.post('https://matrix-synapse.appserver.projectoasis.io/_synapse/admin/v1/register', {
                nonce: generatedNonce?.data?.nonce,
                username: username,
                password: password,
                admin: false,
                mac: cryptedHMAC,
            })
            console.log(generatedRegister)
            if (generatedRegister) {
                mUserLogin({
                    userId: username,
                    password: password,
                })
            }
            // DATA ACCEPTED AKAN STORE IN PROVIDER/LOCAL STORAGE
            console.log("REGISTER ACCOUNT SUCCESS")
            return cryptedHMAC
        } catch (e) { console.log(e) }
    }

    // RUN THIS FUNCTION WHEN APP START
    const mStartClient = async () => {
        try {
            // await client.startClient({ initialSyncLimit: 10 });
            await client.startClient();

            client.once('sync', async function (state, prevState, res) {
                try {
                    if (state === 'PREPARED') {
                        console.log("prepared")
                        console.log(state)
                        console.log(prevState)
                        console.log(res)
                        if (userContext?.state?.access_token != "") {
                            await mGetRoomList()

                            mCreateRoom({
                                room_alias_name: userContext?.state?.public_address,
                            })
                        }
                    } else {
                        console.log(state);
                        // process.exit(1);
                    }
                } catch (e) {
                    console.log(e)
                }
            });
        } catch (e) {
            console.log(e)
        }
    }

    // ATTEMPT TO LOGIN
    const mUserLogin = ({ userId, password }) => {
        try {
            console.log("PROCESSING LOGIN")
            client.login(
                "m.login.password",
                {
                    "user": '@' + userId + ':matrix-synapse.appserver.projectoasis.io',
                    "password": password
                },
                async (err, data) => {
                    if (data) {
                        console.log(data.access_token)

                        userContext.dispatch({ type: "SET_ACCESS_TOKEN", payload: data.access_token })

                        await mStartClient()
                        // DATA ACCEPTED AKAN STORE IN PROVIDER/LOCAL STORAGE
                    } else {
                        mRegister({
                            username: userId,
                            password: password,
                        })
                    }
                }
            )
        } catch (e) {
            console.log("LOGIN ERROR")
            console.log(e)
        }
    }

    const mRegister = async ({
        username,
        password,
    }) => {
        console.log("IN REGISTER FUNCTION START")
        const data = await createHMAC({
            username: username,
            password: password,
        })

        console.log("IN REGISTER FUNCTION END")
        console.log(data)
    }

    const mCreateRoom = async ({
        room_alias_name,
    }) => {
        try {
            const options = {}

            if (room_alias_name) options.room_alias_name = room_alias_name
            options.visibility = 'public'
            options.invite = ['@' + room_alias_name + ':matrix-synapse.appserver.projectoasis.io']
            if (room_alias_name) options.name = room_alias_name
            if (room_alias_name) options.topic = room_alias_name

            await client.createRoom(options, async (err, data) => {
                if (data) {
                    console.log(data)
                } else {
                    console.log("BOLEH SEND MESSAGE TERUS")
                    await client.joinRoom("#" + room_alias_name + ":matrix-synapse.appserver.projectoasis.io", {
                        syncRoom: true,
                    }, (err, data) => {
                        console.log("JOIN ROOM")
                        if (data) {
                            console.log("SUCCESS")
                            console.log(data)
                        }
                    })
                }
            })
        } catch (e) {
            console.log("CREATE ROOM ERROR")
            console.log(e)
        }
    }

    const mGetRoomList = () => {
        console.log("ENTERING GET RROM LIST FUNCTION")
        var rooms = client.getRooms();
        chatContext.dispatch({ type: "SET_ROOMS", payload: rooms })
        console.log(rooms)
        chatContext.state.rooms.forEach(room => {
            console.log(room);
        });
    }

    const mProducer = ({ testRoomId, message }) => {
        const body = {
            message: message,
            from: userContext?.state?.public_address,// sender public address
            created_at: Date.now(),// createed date and time
        }
        console.log("GOING THROUGH PRODUCER FUNCTION")
        const content = {
            "body": body,
            "msgtype": "m.text"
        };
        client.sendEvent(
            testRoomId,
            "m.room.message",
            content,
            "",
            (err, res) => {
                console.log(err);
            }
        );
    }

    return {
        mRegister,
        mUserLogin,
        mCreateRoom,
        mStartClient,
        mProducer,
    }
}

export default useMatrixOrg