
const CheckoutForm = ({ 
    handleFormSubmit,
    name,
    email,
    address,
    error
}) => {
    return (
        <form onSubmit={handleFormSubmit}>
            <label>
                Name:
                <input {...name} />
            </label>
            <label>
                Email:
                <input {...email} />
            </label>
            <label>
                Address:
                <input {...address} />
            </label>
            <button type="submit">
                Pay
            </button>
            {error && <p>{error}</p>}
        </form>
    );
};
    
export default CheckoutForm;