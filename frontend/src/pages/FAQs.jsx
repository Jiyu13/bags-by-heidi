import {useEffect, useState} from "react";
import styled from "styled-components";
import {publicApi} from "../api";


export default function FAQs() {
    const [openIndex, setOpenIndex] = useState(null);
    const [loading, setLoading] = useState(true)

    const [faqs, setFaqs] = useState(null)

    useEffect(() => {
        async function getFaqs() {
            try {
                setLoading(true)
                const res = await publicApi.get(`/faqs/`)
                const result = res.data
                setFaqs(result)
            } catch (error) {
                console.log("failed to get products", error.response.data)
            } finally {
                setLoading(false)
            }
        }

        getFaqs()
    }, [])

    function toggleItem(index) {
        setOpenIndex((prev) => (prev === index ? null : index));
    }

    let runningIndex = 0;

    if (loading) return null

    return (
        <Section>
            <Inner>
                <Title>Frequently Asked Questions</Title>


                <CategorySection>
                    {faqs?.map((item) => {
                        const currentIndex = runningIndex++;
                        const isOpen = openIndex === currentIndex;

                        return (
                            <FAQCard key={item.question}>
                                <QuestionButton
                                    type="button"
                                    onClick={() => toggleItem(currentIndex)}
                                    aria-expanded={isOpen}
                                >
                                    <QuestionText>{item.question}</QuestionText>
                                    <Icon>{isOpen ? "−" : "+"}</Icon>
                                </QuestionButton>

                                <AnswerWrapper $isOpen={isOpen}>
                                    <AnswerInner>
                                        {item.answer.map((paragraph, i) => (
                                            <AnswerText key={i}>{paragraph}</AnswerText>
                                        ))}
                                    </AnswerInner>
                                </AnswerWrapper>
                            </FAQCard>
                        );
                    })}
                </CategorySection>

            </Inner>
        </Section>
    );
}

const Section = styled.section`
  width: 100%;
  padding: 60px 20px;
  background: #f8f6f2;
`;

const Inner = styled.div`
  max-width: 900px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: clamp(2rem, 4vw, 3rem);
  text-align: center;
  margin: 0 0 16px;
  color: #2f2a26;
`;

const Intro = styled.p`
  max-width: 700px;
  margin: 0 auto 40px;
  text-align: center;
  font-size: 1rem;
  line-height: 1.7;
  color: #5c534c;
`;

const CategorySection = styled.div`
  margin-bottom: 42px;
`;

const CategoryTitle = styled.h2`
  font-size: 1.35rem;
  margin: 0 0 18px;
  color: rgb(23, 188, 90);
`;

const FAQCard = styled.div`
  background: #ffffff;
  border: 1px solid #e8e1d9;
  border-radius: 14px;
  overflow: hidden;
  margin-bottom: 14px;
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.04);
`;

const QuestionButton = styled.button`
  width: 100%;
  border: none;
  background: transparent;
  padding: 20px 22px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  cursor: pointer;
  text-align: left;

  &:hover {
    background: #fcfaf7;
  }
`;

const QuestionText = styled.span`
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5;
  color: #2f2a26;
`;

const Icon = styled.span`
  flex-shrink: 0;
  font-size: 1.5rem;
  font-weight: 400;
  color: rgb(23, 188, 90);
`;

const AnswerWrapper = styled.div`
  max-height: ${({$isOpen}) => ($isOpen ? "500px" : "0")};
  overflow: hidden;
  transition: max-height 0.3s ease;
`;

const AnswerInner = styled.div`
  padding: 0 22px 20px;
`;

const AnswerText = styled.p`
  margin: 0 0 12px;
  font-size: 0.97rem;
  line-height: 1.7;
  color: #5c534c;

  &:last-child {
    margin-bottom: 0;
  }
`;