import {CHeader, CContainer, CHeaderBrand, CHeaderNav, CNavItem, CNavLink} from "@coreui/react"
export default function Header(){

return (
    <>
    <CHeader style={{"margin-bottom": 20}}>
      <CContainer fluid>
        <CHeaderBrand href="/">DATA VISUALIZATION</CHeaderBrand>
          <CHeaderNav>

            <CNavItem>
              <CNavLink href="/DVIS-5M-TREES-DS-React" active>
                Home
              </CNavLink>
            </CNavItem>

            <CNavItem>
              <CNavLink href="/DVIS-5M-TREES-DS-React/first-assignment">
                First Assignment
              </CNavLink>
            </CNavItem>

            <CNavItem>
              <CNavLink href="/DVIS-5M-TREES-DS-React/second-assignment">
                Second Assignment
              </CNavLink>
            </CNavItem>


            <CNavItem>
              <CNavLink href="/DVIS-5M-TREES-DS-React/third-assignment" disabled>
                Third Assignment
              </CNavLink>
            </CNavItem>


          </CHeaderNav>
      </CContainer>
    </CHeader>
    </>
)

}