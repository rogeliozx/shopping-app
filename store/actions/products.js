import Product from '../../models/products';
export const DELE_PRODUCT = 'DELE_PRODUCT';
export const CRATE_PRODUCT = 'CRATE_PRODUCT';
export const UPDATE_PRODUCT = 'UPDATE_PRODUCT';
export const SET_PRODUCTS = 'SET_PRODUCTS';

export const fetchProducts = () => {
  return async (dispatch) => {
    try {
      const response = await fetch(
        'https://shopping-app-f704e.firebaseio.com/products.json'
      );
      if (!response.ok) {
        throw new Error('Something went wrong');
      }
      const resData = await response.json();
      const loadedProducts = [];
      for (const key in resData) {
        loadedProducts.push(
          new Product(
            key,
            'u1',
            resData[key].title,
            resData[key].imageUrl,
            resData[key].description,
            resData[key].price
          )
        );
      }
      dispatch({ type: SET_PRODUCTS, products: loadedProducts });
    } catch (error) {
      throw error;
    }
  };
};

export const deleProduct = (productId) => {
  return async (dispatch,getState) => {
    const token =getState().auth.token
    const response = await fetch(
      `https://shopping-app-f704e.firebaseio.com/products/${productId}.json?auth=${token}`,
      {
        method: 'DELETE',
      }
    );
    if (!response.ok) {
      throw new Error('Semthing went wrong!')
    }
    dispatch({
      type: DELE_PRODUCT,
      pid: productId,
    });
  };
};

export const crateProduct = (title, description, imageUrl, price) => {
  return async (dispatch,getState) => {
    const token =getState().auth.token
    try {
      const response = await fetch(
        `https://shopping-app-f704e.firebaseio.com/products.json?auth=${token}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ title, description, imageUrl, price }),
        }
      );
      const resData = await response.json();
      dispatch({
        type: CRATE_PRODUCT,
        productData: {
          id: resData.name,
          title,
          description,
          imageUrl,
          price,
        },
      });
    } catch (error) {
      throw error;
    }
  };
};

export const updateProduct = (id, title, description, imageUrl) => {
  return async (dispatch,getState) => {
 const token =getState().auth.token
    const response = await fetch(
      `https://shopping-app-f704e.firebaseio.com/products/${id}.json?auth=${token}`,
      {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, imageUrl }),
      }
    );
    if (!response.ok) {
      throw new Error('Semthing went wrong!')
    }
    dispatch({
      type: UPDATE_PRODUCT,
      pid: id,
      productData: {
        title,
        description,
        imageUrl,
      },
    });
  };
};
