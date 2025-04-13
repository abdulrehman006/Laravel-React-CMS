<?php

namespace App\Http\Controllers\Frontend;

use App\Http\Controllers\Controller;
use App\Http\Requests\Frontend\PricingPlanStoreRequest;
use App\Models\PaymentHistory;
use App\Models\PricingPlan;
use App\Models\Setting;
use App\Repositories\Frontend\PricingPlanRepository;
use Illuminate\Http\Request;
use Inertia\Inertia;

class PricingPlanController extends Controller
{

    public function index()
    {
        $data['pricing_plans'] = PricingPlan::with('currency')->get();
        return Inertia::render('PricingPlan/Index', $data);
    }

    /**
     *  show Pricing Plan
     */
    public function show(PricingPlan $pricingPlan)
    {
        $data['payment_gateway'] = [
            'is_paypal_active' => Setting::pull('paypal_is_active') == '1' && true,
            'is_stripe_active' => Setting::pull('stripe_is_active') == '1' && true,
            'is_sslcz_active' => Setting::pull('sslcz_is_active') == '1' && true,
            'is_flutterwave_active' => Setting::pull('flutterwave_is_active') == '1' && true,
            'is_razorpay_active' => Setting::pull('razorpay_is_active') == '1' && true,
        ];
        $data['pricing_plan'] = $pricingPlan->load('currency');
        return Inertia::render('PricingPlan/Show', $data);
    }

    public function pay(PricingPlanStoreRequest $request, PricingPlan $pricingPlan, PricingPlanRepository $repository)
    {
        try{
            return $repository->makePayment($request, $pricingPlan);
        } catch (\Exception $exception) {
            dd($exception->getMessage());
        }
    }

    public function paymentSuccess(Request $request, $method, PricingPlanRepository $repository)
    {
        try{
            return $repository->paymentSuccess($method, $request);
        } catch (\Exception $exception) {
            abort(402, 'Payment failed. Please check your payment details and try again.');
        }
    }

    public function paymentCancel(Request $request, $method, PricingPlanRepository $repository)
    {
        $planId = $repository->paymentCancel($method, $request);
        return redirect()->route('pricing.plan', $planId)->with('payment_status', 'failed');
    }

    public function razorpayPay(Request $request)
    {
        $razorpayKeyId = Setting::pull('razorpay_key_id');
        $paymentHistory = PaymentHistory::find($request->payment_id);
        $order_id = $request->order_id;
        return view('payment.razorpay', compact('paymentHistory', 'order_id', 'razorpayKeyId'));
    }
}
