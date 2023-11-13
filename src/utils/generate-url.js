const generateUrl = (page, limit, sort = '', resource) => {
  return `/api/${resource}?page=${page}&limit=${limit}${
    sort ? `&sort=${sort}` : ''
  }`;
};

export default generateUrl;
