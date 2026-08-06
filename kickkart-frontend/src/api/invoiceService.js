import api from "./axios";

export const downloadInvoice = async (orderId) => {
    try {
        const response = await api.get(
            `/orders/${orderId}/invoice`,
            {
                responseType: "blob",
            }
        );

        const blob = new Blob([response.data], {
            type: "application/pdf",
        });

        const url = window.URL.createObjectURL(blob);

        const link = document.createElement("a");

        link.href = url;
        link.download = `Invoice-${orderId}.pdf`;

        document.body.appendChild(link);
        link.click();

        document.body.removeChild(link);

        window.URL.revokeObjectURL(url);

    } catch (error) {
        console.error(error);
        alert("Failed to download invoice.");
    }
};