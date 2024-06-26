import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
    & + & {
        margin-top: 1rem;
    }
`;
const Label = styled.div`
    font-size: 1rem;
    color: #868e96;
    margin-bottom: 0.25rem;
`;
const Input = styled.input`
    width: 100%;
    outline: none;
    border: 1px solid #dee2e6;
    border-radius: 0px;
    line-height: 2.5rem;
    font-size: 1.2rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    ::placehodler {
        color: #dee2e6;
    }
`;

const InputCheck = styled.input.attrs({
    type: 'checkbox',
})`
    outline: none;
    border: 1px solid #dee2e6;
    border-radius: 0px;
    line-height: 2.5rem;
    font-size: 1.2rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    ::placehodler {
        color: #dee2e6;
    }
`;

const Span = styled.span`
    width: 100%;
    outline: none;
    border: 1px solid #dee2e6;
    border-radius: 0px;
    line-height: 2.5rem;
    font-size: 1.2rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
    ::placehodler {
        color: #dee2e6;
    }
`;

const OptionHtml = styled.option`
    width: 100%;
    border: 1px solid #dee2e6;
    outline: none;
    border-radius: 0px;
    line-height: 2.5rem;
    font-size: 1.2rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
`;
const Select = styled.select`
    width: 100%;
    border: 1px solid #dee2e6;
    outline: none;
    border-radius: 0px;
    line-height: 2.5rem;
    font-size: 1.2rem;
    padding-left: 0.5rem;
    padding-right: 0.5rem;
`; 

class Option extends React.Component {
    render(){
        const {  value, name} = this.props;
        return(
            <OptionHtml value={value}>{name}</OptionHtml>
        );
    }
}

export const InputWithLabel = ({ label, ...rest}) => (
    <Wrapper>
        <Label>{label}</Label>
        <Input {...rest} />
    </Wrapper>
);


export const SelectWithLabel = ({ label, input, ...rest}) => (
    <Wrapper>
        <Label>{label}</Label>
        <Select {...rest}>
            {input.map( (c, index) =>{
                return <Option key={index} value={c.country_code} name={c.country_name_kr} />
            })}
        </Select>
    </Wrapper>
);

export const SelectWithLabel2 = ({ label, input, ...rest}) => (
    <Wrapper>
        <Label>{label}</Label>
        <Select {...rest}>
            {input.map( (c, index) =>{
                return <OptionHtml key={index} value={c}>{c}</OptionHtml>
            })}
        </Select>
    </Wrapper>
);

export const CheckWithLabel = ({ defaultValue, label, input, ...rest }) => (
    <Wrapper>
        <Label>{label}</Label>
        {input.map( (m, index) => {
            // console.log(m);
            return (
                <>
                    <Span key={index}>
                        {m}<InputCheck {...rest} defaultValue={m} key={index} value={m} />
                    </Span>
                </>
            );
        })}
    </Wrapper>
);