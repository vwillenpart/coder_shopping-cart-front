
const ItemDetail = ({ product }) => {
    return (
        <div className="pt-4 col-xl-7 col-lg-6">
            <figure className="cursor-pointer ">
                <img src={product.thumbnails[0]} className="img-fluid" />
            </figure>
        </div>
    )
}

export default ItemDetail;
    