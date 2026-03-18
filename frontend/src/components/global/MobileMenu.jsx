import styled from "styled-components";
import {UserContext} from "../../user-content/UserContent";
import {useContext} from "react";
import close_icon from "../../assets/icons/close_24dp.svg";


export default function MobileMenu({ isOpenMenu, handleOpenHeaderMenu }) {

    const { isMobile } = useContext(UserContext)


    function handleClickOverlay(){
        handleOpenHeaderMenu(false)
    }

    return (
        <ModalContainer $isOpenMenu={isOpenMenu} className="modal-container">
            {/*============== Overlay ====================================*/}
            {isMobile && (
                <div
                    style={{
                        width: "calc(100% - 420px)",
                        height: "100%",
                    }}
                    onClick={handleClickOverlay}
                >

                </div>
            )}
            <ModalDialog className="modal-dialog">
                <ModalHeader className="modal-header">
                    <button
                        style={{
                            border: "none",
                            background: "none",
                            position: "absolute",
                            right: "10px",
                            cursor: "pointer",
                        }}
                        onClick={handleOpenHeaderMenu}
                    >
                        <img src={close_icon} alt='close cart'/>
                    </button>
                </ModalHeader>
                <ModalBody className="modal-body">
                    <MenuItem>
                        <Link href="/">Home</Link>
                    </MenuItem>

                    <MenuItem>
                        <Link href="/backpacks">Backpacks</Link>
                    </MenuItem>
                     <MenuItem>
                        <Link href="/handbags">Handbags</Link>
                    </MenuItem>
                     <MenuItem>
                        <Link href="/totes">Totes</Link>
                    </MenuItem>
                     <MenuItem>
                        <Link href="/fun-accessories">Fun Accessories</Link>
                    </MenuItem>

                    <MenuItem>
                        <Link href="/customer-feedback/gallery">Gallery</Link>
                    </MenuItem>
                    <MenuItem>
                        <Link href="/about">About</Link>
                    </MenuItem>
                    <MenuItem>
                        <Link href="/contact">Contact</Link>
                        </MenuItem>
                </ModalBody>

            </ModalDialog>



        </ModalContainer>
    )
}

const ModalContainer = styled.div`
    display: block;
    width: 100%;
    height: 100%;
    position: fixed;
    top: 0;
    right: 0;
    //bottom: 0;
    background: rgba(83, 92, 104, 0.5);
    opacity: 1;
    box-sizing: border-box;
`
const ModalDialog = styled.div`

    box-sizing: border-box;
    position: fixed;
    background-color: white;
    top: 0;
    right: 0;
    height: 100%;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-start;
    align-items: stretch;

    // slide from right to left
    transform: translateX(100%);
    animation: slideLeft 0.3s ease forwards;
  
    @media (width > 520px) {
        width: 60%;
    }

    @media (width <= 520px) {
        width: 80%
    }
    
    
    @keyframes slideLeft {
      0% {
        transform: translateX(100%);
      }
      100% {
        transform: translateX(0%);
      }
    }
`
const ModalHeader = styled.div`
    padding: 0 1.5rem;
    height: 120px;
  display: flex;
  align-items: center;
  z-index: 9999;
  
`

const ModalBody = styled.div`
    padding: 0 1.5rem;
`
const MenuItem = styled.div`
    box-sizing: border-box;
    cursor: pointer;
    display: flex;
    flex-direction: column;
`
const Link = styled.a`
    text-decoration: none;
    color: #000;
    margin-bottom: 2rem;
    font-size: 1rem;
    width: 100%;
`
