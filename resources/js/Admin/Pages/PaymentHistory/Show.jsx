import AdminLayouts from "@/Admin/Layouts/AdminLayouts";
import {Head, Link} from "@inertiajs/react";
import moment from "moment";

export default function Show({paymentHistory}){
    return(
        <AdminLayouts>
            <Head title="Payment Deatils" />
            <div className="yoo-height-b30 yoo-height-lg-b30" />
            <div className="container-fluid">
                <div className="yoo-uikits-heading">
                    <h2 className="yoo-uikits-title">Payment Deatils</h2>
                </div>
                <div className="yoo-height-b20 yoo-height-lg-b20"></div>
                <ul className="yoo-contact-info-list yoo-mp0">
                    <li>
                        <div className="yoo-contact-info-label">Pricing Plan</div>
                        <div className="yoo-contact-info-details yoo-table-medias yoo-style1">
                        {paymentHistory.plan ? (
                            <a
                            href={route('pricing.plan', paymentHistory.plan)}
                            target="_blank"
                            >
                                {paymentHistory.plan.name}
                            </a>
                        ) : (
                            <span style={{ color: 'black' }}>Plan does not exist</span>
                        )}
                        </div>
                    </li>
                    <li>
                        <div className="yoo-contact-info-label">Name</div>
                        <div className="yoo-contact-info-details">{paymentHistory?.name}</div>
                    </li>
                    <li>
                        <div className="yoo-contact-info-label">Email</div>
                        <div className="yoo-contact-info-details">{paymentHistory?.email}</div>
                    </li>
                    <li>
                        <div className="yoo-contact-info-label">Mobile Number</div>
                        <div className="yoo-contact-info-details">{paymentHistory?.mobile}</div>
                    </li>
                    <li>
                        <div className="yoo-contact-info-label">Payed Amount</div>
                        <div className="yoo-contact-info-details">{paymentHistory?.plan?.currency?.symbol}{" "}{paymentHistory?.amount}</div>
                    </li>
                    <li>
                        <div className="yoo-contact-info-label">Payment Method</div>
                        <div className="yoo-contact-info-details">{paymentHistory.method}</div>
                    </li>
                    <li>
                        <div className="yoo-contact-info-label">Whatsapp or Skype</div>
                        <div className="yoo-contact-info-details">{paymentHistory.whatsapp_or_skype}</div>
                    </li>
                    <li>
                        <div className="yoo-contact-info-label">Payment Status</div>
                        <div className="yoo-contact-info-details">
                            {paymentHistory.status === "pending" && (
                                <span className="">Pending</span>
                            )}
                            {paymentHistory.status === "awaiting_payment" && (
                                <span className="">Awaiting Payment</span>
                            )}
                            {paymentHistory.status === "success" && (
                                <span className="">Success</span>
                            )}
                            {paymentHistory.status === "failed" && (
                                <span className="">Failed</span>
                            )}
                        </div>
                    </li>
                    <li>
                        <div className="yoo-contact-info-label">Payment Date</div>
                        <div className="yoo-contact-info-details">
                            {moment(paymentHistory.created_at).format("lll")}
                        </div>
                    </li>
                </ul>
                <div className="mt-5">
                    <strong>Note: </strong> <br />
                    <p>{paymentHistory.note}</p>
                </div>

                <div className="yoo-height-b30 yoo-height-lg-b30" />
            </div>
        </AdminLayouts>
    )
}
