import styled from "styled-components";

export function ProductDescription() {
    return (
        <DescriptionContainer style={{borderTop: "1px solid #eaeaea"}}>
            <ul style={{paddingLeft: "20px"}}>
                <DescriptionItem>Glass stones in gold-plated, rose gold-plated, or rhodium-plated setting</DescriptionItem>
                <DescriptionItem>Gold-filled, rose gold-filled, or sterling silver chain</DescriptionItem>
                <DescriptionItem>Necklace includes an extender and is adjustable between 16 to 18 inches</DescriptionItem>
            </ul>
        </DescriptionContainer>
    )
}

const DescriptionContainer = styled.div`
    color: rgba(40,44,52, 0.6);
    font-size: 0.9rem;
`

const DescriptionItem = styled.li`
  margin: 12px 0;
  line-height: 1.5;
`