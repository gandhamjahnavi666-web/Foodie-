import React from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export const Offers = () => {
  const { triggerToast } = useCart();

  const copyCode = (code) => {
    navigator.clipboard?.writeText(code);
    triggerToast(`Coupon code ${code} copied to clipboard!`);
  };

  const coupons = [
    {
      tag: "FLASH DEAL",
      code: "FOOD50",
      desc: "₹50 off on orders above ₹500.",
      action: "copy"
    },
    {
      tag: "NEW USER",
      code: "WELCOME75",
      desc: "₹75 off on your first eligible order.",
      action: "copy"
    },
    {
      tag: "WEEKEND",
      code: "FEAST30",
      desc: "Up to 30% off selected partner restaurants.",
      action: "copy"
    },
    {
      tag: "LOYALTY",
      code: "POINTS+",
      desc: "Earn 25 bonus points after every eligible order.",
      action: "link",
      link: "/user"
    },
    {
      tag: "FRIEND REFERRAL",
      code: "REFER100",
      desc: "Share Foodie with a friend and unlock a ₹100-style reward.",
      action: "copy"
    },
    {
      tag: "SURPRISE",
      code: "LUCKYBITE",
      desc: "Tap for a surprise instant reward.",
      action: "surprise"
    }
  ];

  const handleSurprise = () => {
    const rewards = [
      "🎉 You unlocked ₹40 off!",
      "🛵 You unlocked FREE delivery!",
      "⭐ You unlocked 50 bonus Foodie points!"
    ];
    const picked = rewards[Math.floor(Math.random() * rewards.length)];
    triggerToast(picked);
  };

  return (
    <main className="page">
      <div className="container">
        <div className="pageTitle">
          <h1>🔥 Foodie Offers & Vouchers</h1>
          <p className="muted">Deals designed to save money and reward regular foodies.</p>
        </div>

        <div className="offerGrid">
          {coupons.map((c) => (
            <div key={c.code} className="panel coupon">
              <span className="tag">{c.tag}</span>
              <h2 className="couponCode">{c.code}</h2>
              <p>{c.desc}</p>

              {c.action === "copy" && (
                <button
                  type="button"
                  className="btn primary"
                  onClick={() => copyCode(c.code)}
                >
                  Copy code
                </button>
              )}

              {c.action === "link" && (
                <Link className="btn primary" to={c.link}>
                  View menu
                </Link>
              )}

              {c.action === "surprise" && (
                <button
                  type="button"
                  className="btn primary"
                  onClick={handleSurprise}
                >
                  🎁 Reveal
                </button>
              )}
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default Offers;

