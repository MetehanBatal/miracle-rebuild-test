<script>
    let summaryVisible = false;
</script>

<svelte:head>
    <title>Thank You | Miracle Brand</title>
	<meta content="Thank You | Miracle Brand" property="og:title">

    <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap" rel="stylesheet">
	<meta content="mb-receipt-v1" name="checkout-funnel-name">
    <meta content="true" name="checkout-receipt-page">
    <script src="https://app.fairing.co/js/enquire-labs.js"></script>
</svelte:head>

<div class="review-outer-box hidden">
    <div class="review-box">
        <div class="close-icon-popup">
            <img class="close-icon-popup-img" src="https://try.miraclebrand.co/receipt/assets/close-icon.svg" alt="">
        </div>
        <div id="enquire_labs_target"></div>
    </div>
</div>
<div class="main">
    <div class="left">
        <div class="wrapper">
            <div class="header">
                <div class="row">
                    <div class="column">
                        <div class="site-logo"><img src="https://try.miraclebrand.co/receipt/assets/logo-checkout-black.svg"></div>
                    </div>
                    <!-- 
                    <div class="column">
                        <div class="site-usa"><img src="../made-in-usa.svg"></div>
                    </div>
                -->
                </div>
            </div>
            <div class="mobile-cart-toggle mobile">
                <div class="summry-toggle-mob" on:click={summaryVisible = !summaryVisible}>
                    <div class="container" id="summry-toggle-mob">
                        <p class="summry-toggle"><svg width="20" height="19" xmlns="http://www.w3.org/2000/svg" class="order-summary-toggle__icon">
                                <path d="M17.178 13.088H5.453c-.454 0-.91-.364-.91-.818L3.727 1.818H0V0h4.544c.455 0 .91.364.91.818l.09 1.272h13.45c.274 0 .547.09.73.364.18.182.27.454.18.727l-1.817 9.18c-.09.455-.455.728-.91.728zM6.27 11.27h10.09l1.454-7.362H5.634l.637 7.362zm.092 7.715c1.004 0 1.818-.813 1.818-1.817s-.814-1.818-1.818-1.818-1.818.814-1.818 1.818.814 1.817 1.818 1.817zm9.18 0c1.004 0 1.817-.813 1.817-1.817s-.814-1.818-1.818-1.818-1.818.814-1.818 1.818.814 1.817 1.818 1.817z"></path>
                            </svg>
                            {#if !summaryVisible}
                            <span class="sm-txt"> Review order summary
                                <svg width="11" height="6" xmlns="http://www.w3.org/2000/svg" class="order-summary-toggle__dropdown" fill="#000">
                                    <path d="M.504 1.813l4.358 3.845.496.438.496-.438 4.642-4.096L9.504.438 4.862 4.534h.992L1.496.69.504 1.812z"></path>
                                </svg>
                            </span>
                            {/if}
                            <span class="sm-txt" style="display:none"> Hide order summary <svg width="11" height="7" xmlns="http://www.w3.org/2000/svg" class="order-summary-toggle__dropdown" fill="#000">
                                    <path d="M6.138.876L5.642.438l-.496.438L.504 4.972l.992 1.124L6.138 2l-.496.436 3.862 3.408.992-1.122L6.138.876z"></path>
                                </svg></span>
                        </p>
                        <p class="togle-price"><span class="checkout-subtotal-value">0.00</span></p>
                    </div>
                </div>
                <div id="toggle-mob-cart" class:closed={!summaryVisible}>
                    <div style="width:100%; padding:30px 0;">
                        <h4 class="chk-head">Order Summary</h4>
                        <div class="checkout-cart-display"></div>
                    </div>
                </div>
            </div>
            <div class="content">
                <div class="order-header">
                    <img src="https://try.miraclebrand.co/receipt/assets/receipt-check.svg" class="checkmark">
                    <h3 class="order-name">
                        Thank you!
                    </h3>
                    <h4>
                        Your miracle products are right around the corner!
                    </h4>
                    <div class="congratulations">
                        🎉 <strong>Congratulations</strong> on taking some of our best online only offers!
                    </div>
                    <p>
                        We are awaiting authorization on your order and will have it ready soon. We will update you on the status of your purchase as soon as possible. Once your order is confirmed, we will send you a notice within 15 minutes.
                    </p>
                    <p style="font-size:14px">
                        For any additional help regarding your order please email us at <a href="mailto:help@miraclebrand.co">help@miraclebrand.co</a>
                    </p>
                </div>
                <div class="order-section border">
                    <!--
                    <div class="order-section_row row-insurance">
                        <img src="images/insured_small.png" class="insurance-car">
                        <span class="insurance-quantity">1</span>
                        <span class="insurance-text">Shipping Insurance</span>
                    </div>
                    -->
                    <div class="order-section_row">
                        <h3>Waiting Authorization</h3>
                        <p>We are awaiting authorization on your order and will have it ready soon.</p>
                    </div>
                </div>
                <div class="order-section border">
                    <div class="order-section_row">
                        <h3>Order updates</h3>
                        <p>You’ll get shipping and delivery updates by email.</p>
                    </div>
                </div>
                <div class="order-section border">
                    <div class="order-section_row">
                        <h3>Customer Information</h3>
                        <div class="row">
                            <div class="column-address">
                                <h4>Billing Address</h4>
                                    <div class="checkout-billing-address"></div>
                            </div>
                            <div class="column-address">
                                <h4>Shipping Address</h4>
                                    <div class="checkout-shipping-address"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="order-section order-section-footer_info">
                    <p class="order-section_contactus">
                        Need help? <a href="mailto:help@miraclebrand.co">Contact us</a>
                    </p>
                    <p class="order-section_continueshopping">
                        <a href="https://miraclebrand.co" class="btn btn-continueshopping">Continue shopping</a>
                    </p>
                </div>
            </div>
            <div class="footer">
                <ul class="policy-list">
                    <li class="policy-list__item ">
                        <a href="https://www.miraclebrand.co/pages/privacy-policy">Privacy Policy</a>
                    </li>
                    <li class="policy-list__item ">
                        <a href="https://www.miraclebrand.co/pages/care-guide">Care Guide</a>
                    </li>
                    <li class="policy-list__item ">
                        <a href="https://www.miraclebrand.co/pages/terms-and-conditions">Terms and Conditions</a>
                    </li>
                </ul>
                <p style="font-size:12px">
                    Copyright 2025. Pattern Brands LLC. All rights reserved.
                </p>
            </div>
        </div>
    </div>
    <div class="right desktop">
        <div class="wrapper">
            <div class="checkout-cart-display"></div>
            <div class="order-section border center coupon">
                <div class="order-section_row">
                    <h3>Congratulations!</h3>
                    <h4>You unlocked a new coupon code!</h4>
                    <p style="margin:10px 0px">
                        You’ve exclusively qualified for this discount because of your recent purchase.
                    </p>
                    <div class="coupon-field">
                        LOVELYCUSTOMER
                    </div>
                    <p style="margin:10px 0px;font-size:13px">
                        Use this coupon code on your next order for <strong>15% OFF!</strong>
                    </p>
                    <a href="https://miraclebrand.co/" class="btn coupon">SHOP NOW</a>
                </div>
            </div>
        </div>
    </div>
</div>

<style scoped>
    body {
        margin: 0;
        font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", sans-serif;
        font-family: Poppins !important;
    }

    body * {
        box-sizing: border-box;
    }

    a {
        text-decoration: none;
        color: #1990c6;
        font-size: 14px;
    }


    h4 {
        font-weight: 400;
        margin: 0px;
    }

    .btn {
        padding: 1.4em 1.7em;
        text-decoration: none;
        background: #000;
        border-radius: 5px;
        color: #FFF;
        font-weight: 600;
        display: inline-block;
    }

    .main {
        min-height: 100vh;
        display: flex;
    }

    .main .left {
        width: 55%;
    }

    .main .left .content {
        padding-bottom: 50px;
    }

    .main .left .wrapper {
        width: 100%;
        float: right;
        padding: 50px 20px 20px 20px;
        max-width: 550px;
    }

    .main .left .header .site-logo img {
        width: 160px;
    }

    .main .left .order-header {
        padding-top: 30px;
    }

    .main .left .order-header .order-number {
        color: #545454;
        font-size: 14px;
    }

    .main .left .order-header .order-name {
        color: #333;
        font-size: 28px;
        font-weight: 800;
        margin: 8px 0;
    }

    .main .left .order-header .checkmark {
        position: relative;
        width: 54px;
        margin-left: 0px;
        margin-top: 5px;
    }

    .order-section {
        margin-top: 30px;
    }

    .order-section .order-section_row {
        padding: 15px;
    }

    .order-section .order-section_row:not(:first-child) {
        border-top: solid 1px #d9d9d9;
    }

    .order-section .order-section_row h3 {
        color: #333;
        font-weight: 400;
        margin: 0;
        margin-bottom: 10px;
    }

    .order-section p {
        margin: 0;
        color: #333;
        font-size: 14px;
    }

    .order-section .order-section_contactus a {
        text-decoration: none;
        color: #1990c6;
        font-size: 14px;
    }

    .order-section.order-section-footer_info {
        display: table;
        width: 100%;
    }

    .order-section.order-section-footer_info .order-section_contactus {
        display: table-cell;
        vertical-align: middle;
        text-align: left;
    }

    .order-section.order-section-footer_info .order-section_continueshopping {
        display: table-cell;
        text-align: right;
        vertical-align: middle;
    }

    .row-insurance .insurance-car {
        border: solid 1px #d9d9d9;
        border-radius: 5px;
        width: 40px;
        float: left;
    }

    .row-insurance .insurance-quantity {
        background: rgba(114, 114, 114, 0.9);
        color: #FFF;
        width: 20px;
        height: 20px;
        position: absolute;
        display: inline-block;
        text-align: center;
        line-height: 20px;
        border-radius: 50%;
        font-size: 13px;
        margin-left: -10px;
        margin-top: -10px;
    }

    .row-insurance .insurance-text {
        line-height: 40px;
        margin-left: 20px;
        font-size: 14px;
        font-weight: 500;
    }

    .border {
        border: solid 1px #d9d9d9;
        border-radius: 5px;
    }

    .main .left .footer {
        padding: 1em 0;
        border-top: 1px solid #e6e6e6;
    }

    .main .left .footer ul.policy-list {
        padding: 0;
        list-style: none;
        display: flex;
        margin: 0;
    }

    .main .left .footer ul.policy-list li.policy-list__item {
        margin-right: 1.5em;
        margin-bottom: 0.5em;
    }

    .main .left .footer ul.policy-list li.policy-list__item a {
        font-size: 13px;
    }

    .main .right {
        width: 45%;
        background: #fafafa;
        border-left: solid 1px #e1e1e1;
    }

    .main .right .wrapper {
        padding: 50px 20px 20px 30px;
        max-width: 450px;
        width: 100%;
    }

    #toggle-mob-cart {
        display: none;
    }

    .mobile-cart-toggle {
        display: inline-block;
        width: 100%;
        padding: 15px;
        background: #fafafa;
        border: 1px solid #e6e6e6;
        margin-top: 20px;
    }

    .mobile-cart-toggle .summry-toggle {
        float: left;
        margin: 0;
        width: calc(100% - 70px);
    }

    .summry-toggle-mob {
        display: inline-block;
        width: 100%;
    }

    .mobile-cart-toggle .togle-price {
        float: right;
        margin: 0;
        width: 70px;
        text-align: right;
    }

    /*.mobile-cart-toggle .togle-price .checkout-subtotal-value:before {
        content: "$";
    }*/

    .mobile-cart-toggle .chk-head {
        margin: 0 0 20px 0;
    }

    @media screen and (max-width: 479px) {
        .main .left .footer ul.policy-list li.policy-list__item {
            margin-right: 10px;
            margin-bottom: 0.5em;
        }
    }

    @media screen and (min-width: 993px) {
        .mobile {
            display: none !important
        }
    }

    @media screen and (max-width: 992px) {
        .desktop {
            display: none !important;
        }

        .main {
            display: block;
        }

        .main .left {
            width: 100%;
        }

        .main .left .wrapper {
            float: none;
            padding: 20px 3vw;
        }

        .main .left .order-header {
            padding-left: 0px;
        }
    }

    p.covid-notice {
        background-color: #ccffda;
        padding: 10px;
        border: 1px solid #46bb66;
        color: #005f1a;
    }


    .congratulations {
        background-color: #ccffda;
        padding: 10px;
        border: 1px solid #46bb66;
        color: #005f1a;
        margin-top: 10px;
        font-size: 14px;
    }

    button.checkout-coupon-button {
        display: none !important;
    }

    .row {
        display: flex;
    }

    .column {
        flex: 50%;
    }

    .column-address {
        flex: 50%;
    }

    .main .left .header .site-usa img {
        width: 80px;
    }

    .site-usa {
        float: right;
    }


    @media screen and (max-width: 600px) {

        .column-address {
            width: 100% !important;
        }


        img.checkmark {
            position: relative !important;
            margin: 0px !important;
        }

        .main .left .order-header {
            padding-left: 0px;
        }

    }

    .mobile-cart-toggle {
        cursor: pointer;
    }


    tr.discount-line {
        text-align: left;
        color: #27925e;
        font-weight: 600;
    }


    tr.product-line {
        text-align: left !important;
    }

    tr.subtotal-line {
        text-align: left;
        border: 0;
    }

    tr.shipping-line {
        text-align: left;
        border: 0;
    }

    tr.tax-line {
        text-align: left;
        border: 0;
    }


    tr.total-line {
        text-align: left;
        font-weight: 600;
    }

    p.notice-shipping {
        border: 1px solid #9ad1ef;
        border-radius: 3px;
        padding: 15px;
        margin-bottom: 20px;
        display: flex;
        align-items: center;
        width: 100%;
        background: #e4f3fb;
        margin-top: 20px;
        font-size: 13px;
    }


    .checkout-cart-display {
        font-size: 14px;
    }

    .checkout-billing-address {
        font-size: 14px;
        margin-top: 10px;

    }

    .checkout-shipping-address {
        font-size: 14px;
        margin-top: 10px;
    }

    .coupon-field {
        padding: 10px 20px;
        font-size: 24px;
        font-weight: 600;
        text-align: center;
        border: 3px dashed #000;
        margin: 10px 0px;
    }

    a.btn.coupon {
        width: 100%;
        text-align: center;
    }

    .center {
        text-align: center;
    }

    .order-section.border.center.coupon {
        background-color: #fff;
    }


    /* Fairing CSS */



    .enquire__response {
        padding: 10px 0px !important;
    }

    .enquire__response-label {
        margin-left: 10px;
    }

    .enquire__response-label:hover {
        color: #666666;
    }

    .content-box__row {
        position: relative;
        min-width: 600px;
        padding: 50px;
        background-color: rgb(51, 51, 51);
        color: #cccccc;
    }

    .os-step__description {
        padding-bottom: 30px;
    }

    .btn--subdued {
        padding: 8px 12px;
        border: none;
        float: right;
        color: rgba(255, 255, 255, 0.78);
        transition: all 0.2s ease-in-out;
        background: #262626 !important;
        /* background: #00A2F2 !important; */
        cursor: pointer;
    }

    .btn--subdued:hover {
        background: #00A2F2 !important;
        color: #fff;
    }



    .enquire__branding {
        position: absolute;
        text-align: center;
        left: 35%;
        bottom: 3%;
        color: #000;
        display: none;
    }

    .enquire__response-label {
        font-weight: 500;
        cursor: pointer;
    }

    textarea {
        background-color: rgb(38, 38, 38);
        width: 100%;
        height: 120px;
        color: white;
        border: 1px solid #ccc;
        border-radius: 5px;
    }

    textarea:focus {
        outline: none;
    }

    .mobile-hidden {
        display: block;
    }

    .review-box {
        overflow-y: auto;
        overflow-x: hidden;
        max-height: 95vh;
        position: relative;
    }

    .notice.notice--error {
        margin-top: 20px !important;
        margin-left: 0px !important;
        position: absolute;
        z-index: 9;
        left: 50px;
        padding: 6px 8px;
        background: #D33A25;
        color: #fff;
        border-radius: 6px;
    }


    .close-icon-popup {
        display: flex;
        align-items: center;
        justify-content: center;
        position: absolute;
        width: 30px;
        height: 30px;
        top: 30px;
        right: 40px;
        z-index: 10000000;
        background-color: rgb(194, 194, 194);
        border-radius: 50%;
        cursor: pointer;
        transform: translateX(-50%);
    }

    .close-icon-popup:hover {
        border: 3px solid #00A2F2;
        transition: all 0.2s ease-in-out;
    }

    .close-icon-popup-img {
        width: 15px;
        height: 15px;
        position: absolute;
    }

    input[type='radio']:hover::after {
        border: 1px solid #666666;
        cursor: pointer;
    }

    input[type='radio']:after {
        width: 15px;
        height: 15px;
        top: -2px;
        left: -1px;
        border-radius: 15px;
        position: relative;
        background-color: rgb(51, 51, 51);
        content: '';
        display: inline-block;
        visibility: visible;
        border: 1px solid #999;
    }

    input[type='radio']:checked:after {
        width: 15px;
        height: 15px;
        border-radius: 15px;
        top: -2px;
        left: -1px;
        bottom: -1px;
        position: relative;
        background-color: #00A2F2;
        content: '';
        display: inline-block;
        visibility: visible;
        border: 2px solid #00A2F2;
    }

    .input-radio {
        margin-top: 0px;
    }



    @media screen and (max-width: 768px) {
        .mobile-hidden {
            display: none;
        }

        .left-order-section {
            height: auto;
        }

        .left-order-section .order-section_row {
            margin-left: 10px;
        }


        .content .order-section.border {
            padding: 20px 10px;
        }

        .content-box__row {
            position: relative;
            width: 90vw;
            padding: 50px;
            color: #cccccc;
            overflow: auto;
            min-width: 300px;
        }

        .enquire__branding {
            display: none;
        }

        .close-icon-popup {
            height: 30px;
            width: 30px;
            top: 30px;
            right: 33px;
        }

        .close-icon-popup-img {
            width: 10px;
            height: 10px;
            position: absolute;
        }

        .review-box {
            max-height: 85vh;
        }
    }

    .notice.notice--error {
        left: auto !important;
        position: fixed !important;
        width: 40% !important;
        max-width: 150px !important;
    }

    .review-outer-box {
        position: fixed;
        top: 0;
        left: 0;
        width: 100vw;
        height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 100000;
        background-color: rgba(0, 0, 0, 0.7);
        padding: 25px;
    }

    .review-outer-box.hidden {
        display: none !important;
    }

    input {
        font-size: 16px;
    }

    .checkout-money {
        white-space: nowrap;
    }

    .btn-continueshopping {
        white-space: pre;
    }


    .enquire__response.fairing__response {
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }


    @media screen and (max-width: 479px) {
        .enquire__other-response__label.fairing__other-response__label {
            display: none;
        }
    }


    div[aria-labelledby="fairing-question-prompt"] > div:last-child .fairing__response {
        display: flex;
        align-items: center;
        justify-content: flex-start;
    }

    .mobile-cart-toggle.mobile {
        padding-right: 20px;
    }
</style>