import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const Aligner = styled.div`
    margin-top: 1rem;
    text-align: right;
    margin-left: 10px;
`;

const StyledLink = styled(Link)`
    color: #868e96;
    &:hover {
        color: #495057;
    }
`

const AuthLink = ({to, children}) => (
    <Aligner>
        <StyledLink to={to}>{children}</StyledLink>
    </Aligner>
);

export default AuthLink;