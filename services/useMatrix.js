
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

            const generatedRegister = await axios.post('https://matrix-synapse.appserver.projectoasis.io/_synapse/admin/v1/register', {
                nonce: generatedNonce?.data?.nonce,
                username: username,
                password: password,
                admin: false,
                mac: cryptedHMAC,
            })
            if (generatedRegister) {
                mUserLogin({
                    userId: username,
                    password: password,
                })
            }
            // DATA ACCEPTED AKAN STORE IN PROVIDER/LOCAL STORAGE
            return cryptedHMAC
        } catch (e) {
            // 
        }
    }

    // RUN THIS FUNCTION WHEN APP START
    const mStartClient = async () => {
        try {
            // await client.startClient({ initialSyncLimit: 10 });
            await client.startClient();

            client.once('sync', async function (state, prevState, res) {
                try {
                    if (state === 'PREPARED') {
                        if (userContext?.state?.access_token != "") {
                            await mGetRoomList()

                            mCreateRoom({
                                room_alias_name: userContext?.state?.public_address,
                            })
                        }
                    } else {
                        // process.exit(1);
                    }
                } catch (e) {
                    //  
                }
            });
        } catch (e) {
            //   
        }
    }

    // ATTEMPT TO LOGIN
    const mUserLogin = ({ userId, password }) => {
        try {
            client.login(
                "m.login.password",
                {
                    "user": '@' + userId + ':matrix-synapse.appserver.projectoasis.io',
                    "password": password
                },
                async (err, data) => {
                    if (data) {

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
            //    
        }
    }

    const mRegister = async ({
        username,
        password,
    }) => {
        const data = await createHMAC({
            username: username,
            password: password,
        })
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
                    //  
                } else {
                    await client.joinRoom("#" + room_alias_name + ":matrix-synapse.appserver.projectoasis.io", {
                        syncRoom: true,
                    }, (err, data) => {
                        if (data) {
                            //   
                        }
                    })
                }
            })
        } catch (e) {
            //  
        }
    }

    const mGetRoomList = () => {
        var rooms = client.getRooms();
        chatContext.dispatch({ type: "SET_ROOMS", payload: rooms })
        chatContext.state.rooms.forEach(room => {
            // 
        });
    }

    const mProducer = ({ testRoomId, message }) => {
        const body = {
            message: message,
            from: userContext?.state?.public_address,// sender public address
            created_at: Date.now(),// createed date and time
        }
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
                //    
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