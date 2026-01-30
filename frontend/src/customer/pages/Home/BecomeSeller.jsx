import React from 'react'

const BecomeSeller = () => {
    return (
        <section className="py-20">
            <div className="max-w-7xl mx-auto px-5 lg:px-10">
                <div className="relative overflow-hidden rounded-[3rem] bg-[#001742] text-white">
                    {/* Decorative Elements */}
                    <div className="absolute top-0 right-0 w-1/3 h-full bg-gradient-to-l from-blue-600/30 to-transparent pointer-events-none" />
                    <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl" />

                    <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between p-12 lg:p-20 gap-12">
                        <div className="max-w-2xl text-center lg:text-left">
                            <span className="inline-block px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-bold uppercase tracking-widest mb-6 border border-blue-500/30">
                                Partner with us
                            </span>
                            <h2 className="text-2xl lg:text-3xl font-extrabold leading-tight tracking-tight">
                                Sell your products with <span className="text-blue-400">Cartivo</span>
                            </h2>
                            <p className="mt-6 text-lg lg:text-xl text-gray-300 font-medium leading-relaxed">
                                Join thousands of brands reaching millions of customers.
                                Grow your business with our world-class infrastructure, secure payments, and dedicated support.
                            </p>

                            <div className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4">
                                <button className="px-10 py-4 bg-white text-[#001742] font-bold rounded-2xl hover:bg-gray-100 transition-all shadow-xl shadow-black/20 transform active:scale-95">
                                    Start Selling Today
                                </button>
                                <button className="px-10 py-4 bg-transparent border border-white/30 text-white font-bold rounded-2xl hover:bg-white/10 transition-all backdrop-blur-sm">
                                    Service Fees & Plans
                                </button>
                            </div>
                        </div>

                        <div className="relative w-full lg:w-1/3 flex justify-center lg:justify-end">
                            <div className="relative w-64 h-64 lg:w-80 lg:h-80">
                                <div className="absolute inset-0 bg-blue-400/20 rounded-full animate-pulse blur-2xl" />
                                <div className="absolute inset-0 border-2 border-white/10 rounded-full animate-spin-slow" />
                                <div className="absolute inset-4 border-2 border-white/5 rounded-full animate-reverse-spin-slow" />

                                <div className="relative z-10 w-full h-full flex items-center justify-center p-8 bg-white/5 backdrop-blur-md rounded-full border border-white/20 shadow-2xl">
                                    <svg className="w-24 h-24 lg:w-32 lg:h-32 text-blue-400 drop-shadow-2xl" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                                    </svg>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <style dangerouslySetInnerHTML={{
                __html: `
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes reverse-spin-slow {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-spin-slow {
          animation: spin-slow 15s linear infinite;
        }
        .animate-reverse-spin-slow {
          animation: reverse-spin-slow 10s linear infinite;
        }
      `}} />
        </section>
    )
}

export default BecomeSeller
