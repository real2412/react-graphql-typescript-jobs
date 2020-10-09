import styled from 'styled-components'

export const ItemOpcion = styled.div`
    display: flex;
    p {
        margin: 10px;
        margin-right: 6px;
    }
    select {
        width: 100%;
        height: 35px;
        background: #fafafa;
        color: #262626;
        padding-left: 5px;
        font-size: 14px;
        border: 1 px solid #dbdbdb;
        margin-left: 10px;
        border-radius: 3px;
        option {
            color: black;
            background: white;
            display: flex;
            white-space: pre;
            min-height: 20px;
            padding: 0px 2px 1px;
        }
    }
`;