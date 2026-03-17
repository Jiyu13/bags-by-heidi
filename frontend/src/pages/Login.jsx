import {useContext, useState} from "react";
import {UserContext} from "../user-content/UserContent";
import {
    ButtonRow,
    FieldBox,
    Form,
    FormInput,
    FormLabel,
    PageContainer,
    PageTitle,
    PageTittleContainer, PageWrapper,
    SubmitInputButton, WarningMessage
} from "./Contact";

export function Login() {

    const {} = useContext(UserContext)


    const initialValue = {
        email: "",
        password: "",
    }

    const [formData, setFormData] = useState(initialValue)
    const [loginError, setLoginError] = useState(null)

    function handleInput(e) {
        const value = e.target.value
        const name = e.target.name
        setFormData({...formData, [name]: value})
    }

    function handleLoginSubmit(e) {
        e.preventDefault()

        const loginUser = {
            email: formData.email,
            password: formData.password
        }

        // async function postLogin() {
        //     try {
        //         const res = await client.post(`/login/`, loginUser, { withCredentials: true })
        //         setIsLogin(true)
        //         setLoginError(null)
        //         const user = res.data
        //         setCurrentUser(user)
        //         window.location.href = "/account"
        //     } catch (error) {
        //         setIsLogin(false)
        //         setLoginError(error.response.data.email[0])
        //     }
        // }
        //
        // postLogin()
    }

    return (
        <PageContainer>
            <PageWrapper>

                <PageTittleContainer>
                    <PageTitle>Login</PageTitle>
                </PageTittleContainer>

                <WarningMessage style={{display: loginError ? "" : "none",}}>
                    {loginError}
                </WarningMessage>

                <Form onSubmit={handleLoginSubmit}>

                <FieldBox>
                    <FormLabel>Email</FormLabel>
                    <FormInput
                        required
                        type="text"
                        placeholder="your@email.com"
                        name="email"
                        value={formData.email}
                        onChange={handleInput}
                    />

                </FieldBox>
                <FieldBox>
                    <FormLabel>Password</FormLabel>
                    <FormInput
                        required
                        type="password"
                        placeholder=""
                        name="password"
                        value={formData.password}
                        onChange={handleInput}
                    />
                </FieldBox>

                {/*<div style={{marginTop: ""}}>*/}
                {/*    <ForgetPasswordLink href="#">*/}
                {/*        Forget password?*/}
                {/*    </ForgetPasswordLink>*/}
                {/*</div>*/}

                <ButtonRow >
                    <SubmitInputButton type="submit" value="Login"/>
                </ButtonRow>

            </Form>
            </PageWrapper>
        </PageContainer>
    )
}
