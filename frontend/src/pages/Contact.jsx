import {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {publicApi} from "../api";
import {MessageSentSuccessfully} from "../components/contact/MessageSentSuccessfully";


export default function Contact() {
    const [isSent, setIsSent] = useState(false)
    const [emailError, setEmailError] = useState(null)
    const initialValue = {
        name: "",
        sender_email: "",
        message: "",
    }

    const [formData, setFormData] = useState(initialValue)

    function handleOnchange(e) {
        const name = e.target.name
        const value = e.target.value
        setFormData({...formData, [name]: value})
    }

    function handleSubmitContactForm(e) {
        e.preventDefault()
        const formObject = {
            name: formData.name,
            sender_email: formData.sender_email,
            message: formData.message,
        }

        async function postContactRequest() {

            try {
                const res = await publicApi.post('/contact-requests/create/', formObject, { withCredentials: true })
                setIsSent(true)

            } catch (error) {
                console.log(error);

                if (error.response && error.response.data) {
                    const data = error.response.data;

                    // Case 1: backend returned general error
                    if (data.error) {
                        setEmailError(data.error);
                    }

                    // Case 2: Django serializer validation errors
                    else if (data.sender_email) {
                        setEmailError(data.sender_email[0]);
                    }

                    // Case 3: fallback
                    else {
                        setEmailError("Something went wrong. Please try again.");
                    }
                } else {
                    setEmailError("Network error. Please try again.");
                }
            }

        }
        postContactRequest()
        setFormData({
            name: "",
            sender_email: "",
            message: "",
            // attachments: "",
        })

    }

    let errorRef = useRef()
    useEffect(() => {
        let handler = (e) => {
            if (emailError && errorRef.current && !errorRef.current.contains(e.target)){
                setEmailError(null)
            }
        }

        document.addEventListener("mousedown", handler)
        return () => {
            document.removeEventListener("mousedown", handler)
        }
    }, [emailError]);


    return (
        <PageContainer className="contact-page-container">
            <PageWrapper className="contact-page-wrapper">
                <PageTittleContainer className="contact-page-title">
                    <PageTitle>Contact</PageTitle>

                    <PageText>Need help? Send us an email!</PageText>
                    {/*<PageText>Send us an email about your questions.</PageText>*/}
                </PageTittleContainer>


                <div
                    style={{
                        display: emailError ? "" : "none",
                        margin: "24px 0",
                        color: "red",
                        fontWeight: "bold"
                        }}
                        ref={errorRef}
                >
                    {emailError}
                </div>

                <Form
                    className='contact-form'
                    onSubmit={handleSubmitContactForm}
                >

                    {isSent && (<MessageSentSuccessfully />)}


                    <FieldBox>
                        <FormLabel>Name</FormLabel>
                        <FormInput
                            type="text"
                            name='name'
                            value={formData?.name}
                            onChange={handleOnchange}
                            required
                        />

                     </FieldBox>

                    <FieldBox>
                        <FormLabel>Email </FormLabel>
                        <FormInput
                            type="email"
                            name='sender_email'
                            value={formData?.sender_email}
                            onChange={handleOnchange}
                            required
                        />
                    </FieldBox>
                    <FieldBox>
                        <FormLabel>Message </FormLabel>
                        <FormTextarea
                            name='message'
                            value={formData?.message}
                            onChange={handleOnchange}
                            required
                        />
                    </FieldBox>


                    <ButtonRow style={{display: "flex", justifyContent: "center", gap: "0.8rem"}}>
                        <SubmitInputButton
                            type="submit"
                            value='Send'
                            // disabled={disabledButton}
                            // style={{
                            //     backgroundColor: disabledButton ? "rgba(40,44,52,.7)" : "rgba(40,44,52, 1)",
                            //     cursor: disabledButton ? "no-drop" : "pointer",
                            // }}
                        />
                    </ButtonRow>
                </Form>
            </PageWrapper>

        </PageContainer>
    )
}

export const PageContainer = styled.div`
  width: 100%;
  //width: 720px;
  margin: 0 auto;
  padding: 0 0.5rem;

  box-sizing: border-box;
  
`;

export const PageWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  box-sizing: border-box;
  max-width: 1024px;
  margin: 0 auto;

`
export const PageTittleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  text-align: center;
  margin-bottom: 2rem;
`;

export const PageTitle = styled.h1`
  font-size: 3rem;
  margin: 2rem 0 1rem;

  @media (max-width: 768px) {
    font-size: 2.2rem;
  }

  @media (max-width: 480px) {
    font-size: 1.8rem;
  }
`;

export const PageText = styled.p`
  font-size: 1rem;
  line-height: 1.6;
  margin: 0 0 1rem;
  color: rgba(143, 143, 143, 1) ;
`;

export const WarningMessage = styled.div`
  color: rgb(242, 79, 102);
  font-size: 1rem;
  font-weight: bold;
  margin: 24px 0;
`;
export const Form = styled.form`
    width: 100%;
    box-sizing: border-box;
`

export const FieldBox = styled.div`
  //margin-bottom: 1rem;
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 1rem;
`
export const FormLabel = styled.label`
    color: rgb(82, 82, 82);
    font-size: 0.8rem;
    margin-bottom: 0.2rem
`

export const FormInput = styled.input`
  width: 100%;
  padding: 0.95rem;
  font-size: 1.2rem;
  border: 1px solid rgb(210, 210, 210);
  box-sizing: border-box;
  outline: none;
  background: transparent;
  border-radius: 8px;
  &:focus {
    border-color: rgb(0, 0, 0);
  }

  @media (max-width: 480px) {
    font-size: 1rem;
    padding: 0.85rem 0;
  }
`
export const FormTextarea = styled.textarea`
  width: 100%;
  min-height: 220px;
  padding: 0.95rem;
  font-size: 1.2rem;
  line-height: 1.5;
  border: 1px solid rgb(210, 210, 210);
  box-sizing: border-box;
  resize: vertical;
  outline: none;
  font-family: inherit;
  background: transparent;
  border-radius: 8px;

  &:focus {
    border-color: rgb(0, 0, 0);
  }

  @media (max-width: 768px) {
    min-height: 200px;
  }

  @media (max-width: 480px) {
    min-height: 180px;
    font-size:1rem;
    padding: 0.9rem;
  }
`
export const ButtonRow = styled.div`
    display: flex;
  justify-content: center;
  width: 100%;
`
export const SubmitInputButton = styled.input`
  font-size: 1rem;
  background-color: rgb(0, 0, 0);
  color: whitesmoke;
  padding: 1rem 1.5rem;
  border: none;
  letter-spacing: 0.1rem;
  cursor: pointer;
  transition: .3s ease;
  margin: 1rem 0 2rem;
  border-radius: 8px;
  width: 100%;
  
  &:hover {
    box-shadow: rgba(0, 0, 0, 0.16) 0px 1px 2px, rgb(51, 51, 51) 0px 0px 0px 2px;
  }
  @media (max-width: 480px) {
    padding: 0.95rem 1.2rem;
    font-size: 1rem;
  }
`