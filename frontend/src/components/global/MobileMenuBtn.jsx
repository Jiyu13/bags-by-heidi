import styled from "styled-components";
import menu_icon from "../../assets/icons/menu_24dp.svg";


export default function MobileMenuBtn({isOpenMenu, handleOpenHeaderMenu}) {
     return (
         <MobileMenuContainer onClick={handleOpenHeaderMenu}>
            <img
                src={menu_icon}
                alt="mobile menu hamburger"
            />
        </MobileMenuContainer>
     )

}

const MobileMenuContainer  = styled.div`
  width: 32px;
  height: 32px;
  padding: 0.5rem;
  border-radius: 45px;
  cursor: pointer;
  position: fixed;
  right: 20px;
  top: 2rem;
  transform: translateY(0);
  transition: transform .35s cubic-bezier(.645, .045, .355, 1);
  transition-delay: .35s;
`