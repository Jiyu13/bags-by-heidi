import styled from "styled-components";

export function MessageSentSuccessfully() {
    return (
        <ModalContent
            style={{
                padding: "24px",
                textAlign: "center",
                marginBottom: "55px",
                backgroundColor: "rgba(46, 204, 113, 0.2)"
            }}
        >
            <h3>Message Sent Successfully!</h3>
            <p>We'll get back to you as soon as possible.</p>
        </ModalContent>
    )
}
export const ModalContent = styled.div`
  position: relative;
  margin: auto;
  background-color: #fff;
  background-clip: padding-box;
  //border: 1px solid rgba(0, 0, 0, .2);
  border-radius: 6px;
  outline: 0;
`