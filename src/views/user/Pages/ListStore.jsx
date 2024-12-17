import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NavLink } from 'react-router-dom';
import { addItemToCart } from '../Reducer/cartReducer';
import { Pagination } from 'antd';
const ListStore = ({ Products, checked }) => {
  const listProduct = useSelector(state => state.product.ListProductSearch);
  const TextSearch = useSelector(state => state.textSearch.Text);
  const danhmuc = useSelector(state => state.textSearch.Danhmuc);
  const sosao = useSelector(state => state.textSearch.sosao);
  const price = useSelector(state => state.textSearch.price);
  const [firstSearch, SetfirstSearch] = useState(true);
  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(9); // Số lượng sản phẩm mỗi trang

  // Lấy danh sách sản phẩm hiện tại dựa trên phân trang
  const currentProducts = Products.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const currentlistProduct = listProduct.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const handlePageChange = (page, pageSize) => {
    setCurrentPage(page);
    setPageSize(pageSize);

  };

  useEffect(() => {
    console.log("gay")
    if (TextSearch || danhmuc || sosao || checked || price) {
      setCurrentPage(1);
      SetfirstSearch(false);
    }
  }, [TextSearch, sosao, danhmuc, checked, price,Products]);

  return (
    <>   
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
      gap: '10px',
      marginTop: '20px'
    }}>
      {firstSearch ? currentProducts.map((product) => {
        {/* const totalStars =0; product.danhgia.reduce((sum, rating) => sum + rating.so_sao, 0);
        const product.sosao =0; product.soluotdanhgia > 0 ? (totalStars / product.soluotdanhgia).toFixed(1) : 0; */}

        return (
          <> <div
            className="card-container card mx-4 mt-3"
            key={product.san_phamId}
            style={{
              width: '250px',
              minHeight: '310px',
              borderRadius: '20px',
              position: 'relative',
              overflow: 'hidden',
              textDecoration: 'none',

            }}
          >
            {product.so_luong > 0 ?
              <NavLink
                to={`/product/detail/${product.san_phamId}`}
                className="card-content"
                style={{
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <img
                    src={`/images/${product.hinhanh}`}
                    className="img-fluid"
                    style={{ maxWidth: 200 }}
                    alt={product.ten_san_pham}
                  />
                </div>

                <div className="ms-3 mt-1">
                  <h6>{product.ten_san_pham}</h6>
                  {product.phantram_GG > 0 ? (
                    <div className="d-flex">
                      <p
                        style={{
                          fontSize: 14,
                          textDecoration: 'line-through',
                        }}
                      >
                        {product.gia_goc} <span className="text-danger">VND</span>
                      </p>
                      <p className="ms-3 fw-bold" style={{ fontSize: 14 }}>
                        {product.gia_km} <span className="text-danger">VND</span>
                      </p>
                    </div>
                  ) : (
                    <p className="fw-bold" style={{ fontSize: 14 }}>
                      {product.gia_goc} <span className="text-danger">VND</span>
                    </p>
                  )}
                  <div className="d-flex">
                    <p>{product.soluotdanhgia} <span className='text-primary' style={{ fontSize: 13 }}>Đánh giá</span></p>
                    <p className="text-end ms-auto me-2">
                      {product.sosao} <span className="bi bi-star-fill text-warning" />
                    </p>
                  </div>
                </div>
              </NavLink>
              :
              <NavLink

                className="card-content"
                style={{
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <img
                    src={`/images/${product.hinhanh}`}
                    className="img-fluid"
                    style={{ maxWidth: 200 }}
                    alt={product.ten_san_pham}
                  />
                </div>

                <div className="ms-3 mt-1">
                  <h6>{product.ten_san_pham}</h6>
                  {product.phantram_GG > 0 ? (
                    <div className="d-flex">
                      <p
                        style={{
                          fontSize: 14,
                          textDecoration: 'line-through',
                        }}
                      >
                        {product.gia_goc} <span className="text-danger">VND</span>
                      </p>
                      <p className="ms-3 fw-bold" style={{ fontSize: 14 }}>
                        {product.gia_km} <span className="text-danger">VND</span>
                      </p>
                    </div>
                  ) : (
                    <p className="fw-bold" style={{ fontSize: 14 }}>
                      {product.gia_goc} <span className="text-danger">VND</span>
                    </p>
                  )}
                  <div className="d-flex">
                    <p>{product.soluotdanhgia} <span className='text-primary' style={{ fontSize: 13 }}>Đánh giá</span></p>
                    <p className="text-end ms-auto me-2">
                      {product.sosao} <span className="bi bi-star-fill text-warning" />
                    </p>
                  </div>
                </div>
              </NavLink>}

            {product.so_luong === 0 && (
              <>

                <div
                  style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    zIndex: 1,
                  }}
                ></div>

                <div
                  className="fw-bold"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: 'red',
                    fontWeight: 'bold',
                    fontSize: '18px',
                    zIndex: 2,
                    opacity: 1,
                  }}
                >
                  Hết hàng
                </div>
              </>
            )}


            {product.so_luong > 0 && (
              <div className="text-center d-flex flex-column justify-content-center borderRadiousRight">
                <i
                  onClick={(e) => {
                    e.stopPropagation();
                    const addCart = addItemToCart({
                      ProductDetail: product,
                      QuantityProduct: 1,
                    });
                    dispatch(addCart);
                  }}
                  className="fa fa-cart-plus text-white"
                ></i>
              </div>
            )}
            
          </div>
        
           
           
            </>
        );
      }) : listProduct.length > 0 ? currentlistProduct.map((product) => {
        {/* const totalStars = product.danhgia.reduce((sum, rating) => sum + rating.so_sao, 0);
        const product.sosao = product.soluotdanhgia > 0 ? (totalStars / product.soluotdanhgia).toFixed(1) : 0; */}

        return (
          <div
            className="card-container card mx-4 mt-3"
            key={product.san_phamId}
            style={{
              width: '250px',
              minHeight: '310px',
              borderRadius: '20px',
              position: 'relative',
              overflow: 'hidden',
              textDecoration: 'none',

            }}
          >
            {product.so_luong > 0 ? <NavLink
              to={`/product/detail/${product.san_phamId}`}
              className="card-content"
              style={{
                color: 'inherit',
                textDecoration: 'none',
              }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
              >
                <img
                  src={`/images/${product.hinhanh}`}
                  className="img-fluid"
                  style={{ maxWidth: 200 }}
                  alt={product.ten_san_pham}
                />
              </div>

              <div className="ms-3 mt-1">
                <h6>{product.ten_san_pham}</h6>
                {product.phan_tram_GG > 0 ? (
                  <div className="d-flex">
                    <p
                      style={{
                        fontSize: 14,
                        textDecoration: 'line-through',
                      }}
                    >
                      {product.gia_goc} <span className="text-danger">VND</span>
                    </p>
                    <p className="ms-3 fw-bold" style={{ fontSize: 14 }}>
                      {product.gia_km} <span className="text-danger">VND</span>
                    </p>
                  </div>
                ) : (
                  <p className="fw-bold" style={{ fontSize: 14 }}>
                    {product.gia_goc} <span className="text-danger">VND</span>
                  </p>
                )}
                <div className="d-flex">
                  <p>{product.soluotdanhgia} <span className='text-primary' style={{ fontSize: 13 }}>Đánh giá</span></p>
                  <p className="text-end ms-auto me-2">
                    {product.sosao} <span className="bi bi-star-fill text-warning" />
                  </p>
                </div>
              </div>
            </NavLink> :
              <NavLink

                className="card-content"
                style={{
                  color: 'inherit',
                  textDecoration: 'none',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <img
                    src={`/images/${product.hinhanh}`}
                    className="img-fluid"
                    style={{ maxWidth: 200 }}
                    alt={product.ten_san_pham}
                  />
                </div>

                <div className="ms-3 mt-1">
                  <h6>{product.ten_san_pham}</h6>
                  {product.phantram_GG > 0 ? (
                    <div className="d-flex">
                      <p
                        style={{
                          fontSize: 14,
                          textDecoration: 'line-through',
                        }}
                      >
                        {product.gia_goc} <span className="text-danger">VND</span>
                      </p>
                      <p className="ms-3 fw-bold" style={{ fontSize: 14 }}>
                        {product.gia_km} <span className="text-danger">VND</span>
                      </p>
                    </div>
                  ) : (
                    <p className="fw-bold" style={{ fontSize: 14 }}>
                      {product.gia_goc} <span className="text-danger">VND</span>
                    </p>
                  )}
                  <div className="d-flex">
                    <p>{product.soluotdanhgia} <span className='text-primary' style={{ fontSize: 13 }}>Đánh giá</span></p>
                    <p className="text-end ms-auto me-2">
                      {product.sosao} <span className="bi bi-star-fill text-warning" />
                    </p>
                  </div>
                </div>
              </NavLink>
            }

            {product.so_luong === 0 && (
              <>
                <div
                  style={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    zIndex: 1,
                  }}
                ></div>

                <div
                  className="fw-bold"
                  style={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    color: 'red',
                    fontWeight: 'bold',
                    fontSize: '18px',
                    zIndex: 2,
                    opacity: 1,
                  }}
                >
                  Hết hàng
                </div>
              </>
            )}

            {product.so_luong > 0 ? (
              <div className="text-center d-flex flex-column justify-content-center borderRadiousRight">
                <i
                  onClick={(e) => {
                    e.stopPropagation();
                    const addCart = addItemToCart({
                      ProductDetail: product,
                      QuantityProduct: 1,
                    });
                    dispatch(addCart);
                  }}
                  className="fa fa-cart-plus text-white"
                ></i>
              </div>
            ) : <div className="text-center d-flex flex-column justify-content-center borderRadiousRight">
              <i

                className="fa fa-cart-plus text-white"
              ></i>
            </div>}
          </div>
        );
      }) : (
        <div className='row mt-5'>
          <div className="col-md-12 text-center mt-5">
            <h4 className='fw-bold'>Rất tiếc !</h4>
            <h6>Không tìm thấy kết quả</h6>
            <img className='img-fluid' src="/images/img-search.svg" alt="No results found" />
          </div>
        </div>
      )}


     
    </div>
   
    {firstSearch == true || listProduct.length >0 ?  
      <div className="col-md-12 d-flex justify-content-center align-items-center mt-1 mb-4">
            <Pagination 
        current={currentPage}
        pageSize={pageSize}
        total={firstSearch ==true ?  Products.length : listProduct.length }
        onChange={handlePageChange}
        showSizeChanger
        pageSizeOptions={['8', '16', '24']}
        style={{ textAlign: 'center', marginTop: '20px' }}
      />
      
            </div>
    :
    null
    }
    
    </>
  );
};

export default ListStore;