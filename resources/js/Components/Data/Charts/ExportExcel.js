import React from 'react';
import ReactExport from "react-export-excel";
import { size } from 'lodash';
import { Button, Radio } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import styled from 'styled-components';

const Container = styled.div`
    float: right;
    display: inline;
`;


const ExcelFile = ReactExport.ExcelFile;
const ExcelSheet = ReactExport.ExcelFile.ExcelSheet;
const ExcelColumn = ReactExport.ExcelFile.ExcelColumn;

const ExportExcel = ({dataSet}) => 
     (
         <Container>
            <ExcelFile element={<Button type="primary" shape="round" icon={<DownloadOutlined />} >Excel</Button>}>
                 <ExcelSheet dataSet={dataSet} name="data" />
            </ExcelFile>
         </Container>
    );

export default ExportExcel;