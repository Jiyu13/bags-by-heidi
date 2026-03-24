import {useEffect, useRef, useState} from "react";
import styled from "styled-components";
import {publicApi} from "../../api";

export default function PopupEnquiryForm({isOpen, setIsEnquiryOpen, productTitle = "", setIsSent}) {

    const [formData, setFormData] = useState({
        name: "",
        sender_email: "",
        subject: productTitle ? `Enquiry about ${productTitle}` : "",
        message: "",
    });
    const [emailError, setEmailError] = useState(null)

    function handleOnCloseEnquiry() {
        setIsEnquiryOpen(false);
    }


    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [isOpen]);

    useEffect(() => {
        setFormData((prev) => ({
            ...prev,
            subject: productTitle ? `Enquiry about ${productTitle}` : prev.subject,
        }));
    }, [productTitle]);

    function handleChange(e) {
        const {name, value} = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    }


    function handleSubmit(e) {
        e.preventDefault()

        async function postContactRequest() {

            try {
                await publicApi.post('/contact-requests/create/', formData, { withCredentials: true })
                setIsSent(true)
                handleOnCloseEnquiry()
            } catch (error) {
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
            subject: "",
            message: "",
        })

    }

    let errorRef = useRef()
    useEffect(() => {
        let handler = (e) => {
            if (emailError && errorRef.current && !errorRef.current.contains(e.target)) {
                setEmailError(null)
            }
        }

        document.addEventListener("mousedown", handler)
        return () => {
            document.removeEventListener("mousedown", handler)
        }
    }, [emailError]);

    return (
        <Overlay onClick={handleOnCloseEnquiry}>
            <Modal onClick={(e) => e.stopPropagation()}>
                <TopRow>
                    <Title>Make An Enquiry</Title>
                    <CloseButton type="button" onClick={handleOnCloseEnquiry}>
                        ×
                    </CloseButton>
                </TopRow>
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

                <Form onSubmit={handleSubmit}>
                    <FieldGroup>
                        <Label htmlFor="name">Name</Label>
                        <Input
                            id="name"
                            name="name"
                            type="text"
                            autoComplete="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </FieldGroup>

                    <FieldGroup>
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            name="sender_email"
                            type="email"
                            autoComplete="email"
                            value={formData.sender_email}
                            onChange={handleChange}
                            required
                        />
                    </FieldGroup>

                    <FieldGroup>
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                            id="subject"
                            name="subject"
                            type="text"
                            autoComplete="off"
                            value={formData.subject}
                            onChange={handleChange}
                            required
                        />
                    </FieldGroup>

                    <FieldGroup>
                        <Label htmlFor="message">Message</Label>
                        <TextArea
                            id="message"
                            name="message"
                            autoComplete="off"
                            value={formData.message}
                            onChange={handleChange}
                            rows={6}
                            required
                        />
                    </FieldGroup>

                    <SubmitButton type="submit">
                        Submit Enquiry
                    </SubmitButton>
                </Form>
            </Modal>
        </Overlay>
    );
}

const Overlay = styled.div`
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.45);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
  padding: 1rem;
`;

const Modal = styled.div`
  width: 100%;
  max-width: 560px;
  background: #fff;
  border-radius: 12px;
  padding: 1.5rem;
  box-sizing: border-box;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.18);
`;

const TopRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const Title = styled.h2`
  margin: 0;
  font-size: 1.4rem;
`;

const CloseButton = styled.button`
  border: none;
  background: transparent;
  font-size: 1.8rem;
  line-height: 1;
  cursor: pointer;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  margin-bottom: 0.4rem;
  font-size: 0.95rem;
  color: #13141b;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.85rem 1rem;
  border: 1px solid #d7d7d7;
  border-radius: 8px;
  box-sizing: border-box;
  font-size: 0.95rem;
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.85rem 1rem;
  border: 1px solid #d7d7d7;
  border-radius: 8px;
  box-sizing: border-box;
  font-size: 0.95rem;
  resize: vertical;
`;

const SubmitButton = styled.button`
  margin-top: 0.5rem;
  border: none;
  background: #13141b;
  color: #fff;
  padding: 0.95rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
`;