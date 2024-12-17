import React, { useEffect, useState } from 'react'
import ListStoreNew from './ListStoreNew'
import ProductDanhmuc from './ProductDanhmuc';
import axios from 'axios';
import { NavLink } from 'react-router-dom'; 
import { addItemToCart } from '../Reducer/cartReducer';
import { useDispatch } from 'react-redux'
import { Link } from 'react-router-dom';
import Sidebar from '../partials/Sidebar';
const YeuThichSanPham = () => {
    const [Data, SetData] = useState([]);
    const userId = localStorage.getItem('account_id');
    const dispatch = useDispatch()
    const API_Call_SP_FAVORITE = async () => {
        const res = await axios({ url: `http://localhost:8080/FindALL/${userId}`, method: 'GET' })
        SetData(res.data)

    }

    useEffect(() => {
        API_Call_SP_FAVORITE()

    }, [])

    return (

        <div className="row vh-100 m-0">
        <div className="col-2 bg-dark text-white p-0">
          <Sidebar userId={userId} />
        </div>

        <main className="col-10 bg-light  justify-content-center align-items-center">
        <div className='container-fluid'>
            <div className="row mt-3">
                <div className="col-md-12">
                    <p className='ms-4'><span className='text-danger fw-bold fs-3'>{Data.length}</span> <span className='fs-3 fw-bold ms-1'>Sản phẩm</span></p>
                </div>
            </div>
            <div className="row">
                {Data.map((product, index) => {

                    const totalStars = product.sanpham.danhgia.reduce((sum, rating) => sum + rating.so_sao, 0);
                    const averageStars = product.sanpham.danhgia.length > 0 ? (totalStars / product.sanpham.danhgia.length).toFixed(1) : 0;
                    return (
                        <div className="col-sm-12 col-md-3 mt-3 d-flex justify-content-center" key={index}>
                            <div className="card mx-5 mt-3" style={{ minWidth: '250px', minHeight: '310px', borderRadius: '20px', position: 'relative', overflow: 'hidden', }}>
                                <NavLink to={`/product/detail/${product.sanpham.san_phamId}`} style={{ textDecoration: 'none', color: 'inherit' }} >
                                    <div className='d-flex justify-content-center align-content-center'>
                                        <img src={`/images/${product.sanpham.hinhanh[0].ten_hinh}`} className="img-fluid mx-auto" style={{ maxWidth: 200 }} alt="" />
                                    </div>
                                    <div className='text-start ms-3 mt-1'>
                                        <h6>{product.sanpham.ten_san_pham}</h6>
                                        {product.sanpham.phantram_GG > 0 ? (
                                            <div className="d-flex">
                                                <p style={{ fontSize: 14, textDecoration: 'line-through' }}>
                                                    {product.sanpham.gia_goc} <span className='text-danger'>VND</span>
                                                </p>
                                                <p className='ms-3 fw-bold' style={{ fontSize: 14 }}>
                                                    {product.sanpham.gia_km} <span className='text-danger'>VND</span>
                                                </p>
                                            </div>
                                        ) : (
                                            <p className='fw-bold' style={{ fontSize: 14 }}>
                                                {product.sanpham.gia_goc} <span className='text-danger'>VND</span>
                                            </p>
                                        )}
                                        <div className="d-flex">
                                            <p>2.4 <span className='text-danger'>Km</span></p>
                                            <p className='text-end ms-auto me-2'>
                                                {averageStars} <span className="bi bi-star-fill text-warning" />
                                            </p>
                                        </div>
                                    </div>
                                </NavLink>
                                <div className='text-center d-flex flex-column justify-content-center borderRadiousRight'  >
                                    <i onClick={() => {

                                        const addCart = addItemToCart({
                                            ProductDetail: product.sanpham,
                                            QuantityProduct: 1,
                                        });
                                        dispatch(addCart);
                                    }} className="fa fa-cart-plus text-white"></i>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
        </main>
      </div>
  

     
    )
}
const containerStyle = {
    display: 'flex',
    height: '100vh',
    fontFamily: 'Arial, sans-serif',
};

const sidebarStyle = {
    width: '250px',
    backgroundColor: '#2c3e50',
    color: '#fff',
    padding: '20px',
    boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)',
};

const linkStyle = {
    textDecoration: 'none',
    color: 'white',
};

const menuStyle = {
    listStyleType: 'none',
    padding: '0',
};

const buttonStyle = {
    width: '100%',
    padding: '12px',
    backgroundColor: '#34495e',
    color: 'white',
    border: 'none',
    textAlign: 'left',
    cursor: 'pointer',
    fontSize: '16px',
    marginBottom: '10px',
    borderRadius: '5px',
    transition: 'background-color 0.3s',
};

const mainContentStyle = {
    flex: 1,
    padding: '40px',
    backgroundColor: '#ecf0f1',
};


export default YeuThichSanPham