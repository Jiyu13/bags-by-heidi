import { useEffect, useState } from "react";
import styled from "styled-components";
import {publicApi} from "../../api";

export default function PopupEnquiryForm({isOpen, onClose, productTitle = "",}) {
      const [formData, setFormData] = useState({
          name: "testing",
          sender_email: "testing@gmail.com",
          subject: productTitle ? `Enquiry about ${productTitle}` : "",
          message: "test making an enquiry",
      });
      const [isSent, setIsSent] = useState(false)
      const [emailError, setEmailError] = useState(null)



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
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      }


      function handleSubmit(e) {
          e.preventDefault()

          async function postContactRequest() {

              try {
                  console.log(formData)
                  const res = await publicApi.post('/contact-requests/create/', formData, { withCredentials: true })
                  setIsSent(true)
                  onClose();
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


      return (
      <Overlay onClick={onClose}>
        <Modal onClick={(e) => e.stopPropagation()}>
          <TopRow>
            <Title>Make An Enquiry</Title>
            <CloseButton type="button" onClick={onClose}>
              ×
            </CloseButton>
          </TopRow>

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

            <SubmitButton type="submit" value="Submit Enquiry" />
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

const SubmitButton = styled.input`
  margin-top: 0.5rem;
  border: none;
  background: #13141b;
  color: #fff;
  padding: 0.95rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.95rem;
`;