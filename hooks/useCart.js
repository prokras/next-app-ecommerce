import { useContext } from 'react';
import { Context } from '../context/CartProvider';

const useCart = () => useContext(Context);

export default useCart;
