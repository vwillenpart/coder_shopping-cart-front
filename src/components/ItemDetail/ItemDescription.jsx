const ItemDetail = ({ product }) => {
    return (
        <>
            <h1 className="mb-4">{product.title}</h1>
            <div className="d-flex flex-column mb-4">
                <ul className="list-inline mb-2 mb-sm-0">
                    <li className="list-inline-item h4 fw-light mb-0">${product.price}</li>
                    <li className="list-inline-item text-muted fw-light"><del>${product.price * 1.5}</del></li>
                </ul>
            </div>
            <p className="mb-4 text-muted">{product.description}</p>
        </>
    )
}

export default ItemDetail;
    