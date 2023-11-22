import {CHeader, CContainer, CHeaderBrand, CHeaderNav, CNavItem, CNavLink} from "@coreui/react"
import { Link } from "react-router-dom";
export default function Header(){

return (
    <>
    <CHeader style={{"margin-bottom": 20}}>
      <CContainer fluid>
        <CHeaderBrand>DATA VISUALIZATION</CHeaderBrand>
          <CHeaderNav>

            <CNavItem>
            <CNavLink>
              <Link to="/" active>
                Home
              </Link>
              </CNavLink>
            </CNavItem>

            <CNavItem>
            <CNavLink>
              <Link to="/first-assignment">
                First Assignment
              </Link>
              </CNavLink>
            </CNavItem>

            <CNavItem>
            <CNavLink>
              <Link to="/second-assignment">
                Second Assignment
              </Link>
              </CNavLink>
            </CNavItem>


            <CNavItem>
              <CNavLink href="/third-assignment" disabled>
                Third Assignment
              </CNavLink>
            </CNavItem>


          </CHeaderNav>
      </CContainer>
    </CHeader>
    </>
)

}