import { createGlobalStyle} from "styled-components";
import reset from "styled-reset";

const globalStyles = createGlobalStyle`
    ${reset};
    a{
        text-decoration:none;
        color:inherit;
    }
    *{
        box-sizing: border-box;
    }
    body{
        padding-top:50px;
        width: 100%;
        height: 100%;
        font-family:-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif;
        font-size: 12px;
        color: #696969;
    }
    `;
    
    // color:inherit; #ff5122
// padding-top: 55px;

// *: 모든 elementes
export default globalStyles;