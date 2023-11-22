import {CHeader, CContainer, CHeaderBrand, CHeaderNav, CNavItem, CNavLink} from "@coreui/react"
export default function Header(){

return (
    <>
    <CHeader style={{"margin-bottom": 20}}>
      <CContainer fluid>
        <CHeaderBrand href="/">DATA VISUALIZATION</CHeaderBrand>
          <CHeaderNav>

            <CNavItem>
              <CNavLink href="/" active>
                Home
              </CNavLink>
            </CNavItem>

            <CNavItem>
              <CNavLink href="/first-assignment">
                First Assignment
              </CNavLink>
            </CNavItem>

            <CNavItem>
              <CNavLink href="/secound-assignment">
                Second Assignment
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