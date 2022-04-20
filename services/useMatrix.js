
import sdk from "matrix-js-sdk"
import { useContext } from 'react'
import crypto from 'crypto'
import axios from 'axios'
import { User } from "../providers/user-provider"

function useMatrixOrg() {

    const userContext = useContext(User);

    const client = sdk.createClient({
        baseUrl: "https://matrix-synapse.appserver.projectoasis.io/",
        accessToken: "syt_emFpbWFuemFfMg_QFsvMArxdffJkZJlVlBs_2X1qv9",
        userId: "@zaimanza_2:matrix-synapse.appserver.projectoasis.io"
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
        // await client.startClient({ initialSyncLimit: 10 });
        await client.startClient();

        client.once('sync', function (state, prevState, res) {
            if (state === 'PREPARED') {
                console.log("prepared")
                console.log(state)
                console.log(prevState)
                console.log(res)
            } else {
                console.log(state);
                // process.exit(1);
            }
        });
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
                (err, data) => {
                    if (data) {
                        console.log(data.access_token)

                        userContext.dispatch({ type: "SET_ACCESS_TOKEN", payload: data.access_token })
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
        visibility,
        invite,
        name,
        topic,
    }) => {
        try {
            const options = {}

            if (room_alias_name) options.room_alias_name = room_alias_name
            if (visibility) options.visibility = visibility
            if (invite) options.invite = invite
            if (name) options.name = name
            if (topic) options.topic = topic

            await client.createRoom(options, (err, data) => {
                console.log("ERROR IN CREATING ROOM")
                if (data) {
                    console.log(data)
                } else {
                    console.log(err)
                    // room already exists
                    // NEED TO JOIN ROOM
                    console.log("BOLEH SEND MESSAGE TERUS")
                }
            })
        } catch (e) {
            console.log("CREATE ROOM ERROR")
            console.log(e)
        }
    }

    return {
        mRegister,
        mUserLogin,
        mCreateRoom,
        mStartClient,
    }
}

export default useMatrixOrg