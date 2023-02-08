import { Login } from "./pages/guest/login.jsx";
import CookieConsent, {
  Cookies,
  getCookieConsentValue,
} from "react-cookie-consent";
import { useState } from "react";
function App() {
  const [acceptCookie, setAcceptCookies] = useState(getCookieConsentValue());

  return (
    <>
      {acceptCookie ? <Login /> : <> </>}
      <CookieConsent
        onAccept={() => {
          setAcceptCookies(true);
        }}
      >
        This website uses cookies to enhance the user experience.
      </CookieConsent>
    </>
  );
}

export default App;
