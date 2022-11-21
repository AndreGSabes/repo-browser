
# Repository Browser 

Basic repository browser using latest versions of the following libraries: 

 - [React v18](https://reactjs.org/)
 - [Styled Components](https://styled-components.com/)
 - [Axios](https://axios-http.com/docs/intro)
 - [React-Icons](https://react-icons.github.io/react-icons/)
 - [React-Router](https://reactrouter.com/en/main)
## API Reference

#### Get repository

```http
  GET api/repos/${repository}
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `repository`| `string` | **Required**. Name of the repository|

#### Get repository issues

```http
  GET api/repos/${repository}/issues
```

| Parameter | Type     | Description                       |
| :-------- | :------- | :-------------------------------- |
| `repository`| `string` | **Required**. Name of the repository|
| `state`| `string` | State of issue, can be the following:  `open`, `closed` or `all`|
| `per_page`| `number` | Number of issues displayed per page |
