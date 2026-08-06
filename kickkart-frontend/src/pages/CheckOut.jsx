import { useState } from "react";
import CheckoutForm from "../components/checkout/CheckOutForm";
import OrderSummary from "../components/checkout/OrderSummary";

const Checkout = () => {

    const [totalAmount, setTotalAmount] = useState(0);

    return (
        <div className="min-h-screen bg-gray-100 py-10">

            <div className="max-w-7xl mx-auto px-4">

                <h1 className="text-4xl font-bold mb-8">
                    Checkout
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                    <div className="lg:col-span-2">

                        <CheckoutForm
                            totalAmount={totalAmount}
                        />

                    </div>

                    <div>

                        <OrderSummary
                            setTotalAmount={setTotalAmount}
                        />

                    </div>

                </div>

            </div>

        </div>
    );
};

export default Checkout;