import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    height: 100%;
`;

const Title = styled.div`
    font-size: 1.5rem;
    font-weight: 500;
    color: #343a40;
    margin-bottom: 1rem;
`;

const AuthContent = ({title, children}) => (
    <Container>
        <Title>{title}</Title>
        {children}
    </Container>
);

export default AuthContent;