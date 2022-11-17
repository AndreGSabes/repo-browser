import styled from "styled-components";
import { Link } from "react-router-dom";

export const Loading = styled.div`
  color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

export const Container = styled.div`
  max-width: 700px;
  background: #fff;
  border-radius: 4px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.2);
  padding: 30px;
  margin: 80px auto;
`;

export const BackButton = styled(Link)`
  border: 0;
  outline: 0;
  background: transparent;
`;

export const Owner = styled.header`
  display: flex;
  align-items: center;
  flex-direction: column;

  img {
    width: 150px;
    border-radius: 20%;
    margin-bottom: 20px 0;
  }
  h1 {
    font-size: 2rem;
    color: #0d2636;
  }

  p {
    margin-top: 5px;
    font-size: 1rem;
    color: #000;
    text-align: center;
    line-height: 1.4;
    max-width: 400px;
  }
`;

export const Title = styled.h2`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin: 20px 0 20px 0;
  font-size: 1.5rem;
`;

export const Issues = styled.ul`
  list-style: none;
  margin-top: 20px;

  li {
    padding: 15px 0;
    display: flex;
    flex-direction: column;

    & + li {
      border-top: 1px solid #eee;
    }

    div {
      display: flex;
      margin-bottom: 16px;
    }

    a {
      margin-top: 5px;
      color: #00008b80;
    }

    h4 {
      margin: 0;
      color: #0d2636;
      flex-wrap: nowrap;
    }

    p {
      font-size: 0.75rem;
      padding-right: 8px;
      word-break: break-word;
    }
  }
`;

export const IssueLabel = styled.div`
  display: flex;
  border: 2px solid #${(props) => props.color};
  background-color: #${(props) => props.color}20; // add opacity of 0.2 only to background color
  border-radius: 8px;
  margin: 0 16px 0 16px;
  padding-left: 8px;
  align-items: center;
`;

export const PageActions = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;

  button {
    outline: 0;
    border: 0;
    background-color: #0d263660;
    color: #ffffff;
    padding: 5px 10px;
    border-radius: 6px;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
`;

export const Filters = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-top: 16px;

  button {
    outline: 0;
    border: 0;
    background-color: #0d263660;
    color: #ffffff;
    padding: 5px 10px;
    border-radius: 6px;

    &:disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }
  }
`;
