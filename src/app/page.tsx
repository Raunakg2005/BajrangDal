'use client';

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { Shield, Heart, Users, ChevronDown, Check, Star } from "lucide-react";
import { useRef, useState, useEffect } from "react";

export default function Home() {
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, 200]);
  const y2 = useTransform(scrollY, [0, 500], [0, -150]);

  return (
    <main className="min-h-screen bg-saffron-50 selection:bg-saffron-200 overflow-x-hidden font-inter">
      {/* 1. HERO SECTION - Parallax */}
      <div className="relative w-full h-screen bg-black overflow-hidden flex items-center justify-center">
        {/* Background Image - Parallax */}
        <motion.div style={{ y: y1 }} className="absolute inset-0 z-0 opacity-80">
          <Image
            src="/hanuman-hero.png"
            alt="Lord Hanuman"
            fill
            className="object-cover"
            priority
          />
        </motion.div>

        {/* Overlay Gradients */}
        <div className="absolute inset-0 z-0 bg-gradient-to-t from-saffron-900 via-transparent to-black/60" />
        <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/40 to-transparent" />

        {/* Content */}
        <div className="relative z-10 text-center px-4 max-w-6xl mx-auto flex flex-col items-center">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="w-full"
          >
            <h2 className="text-saffron-300 tracking-[0.2em] md:tracking-[0.5em] text-xs md:text-xl font-bold mb-4 uppercase">
              Dharmo Rakshati Rakshitah
            </h2>
            <h1 className="font-cinzel text-4xl sm:text-6xl md:text-9xl font-black text-white drop-shadow-[0_10px_10px_rgba(0,0,0,0.8)] mb-4 md:mb-2 tracking-wide uppercase leading-none break-words">
              Bajrang<span className="text-saffron-500">Dal</span>
            </h1>
            <p className="text-lg md:text-2xl text-gray-200 mt-4 md:mt-6 max-w-2xl mx-auto font-light leading-relaxed px-4">
              Serving Dharma, Protecting Society, Preserving Culture.
              <br />
              <span className="text-saffron-400 font-bold block mt-2 md:inline">Seva • Suraksha • Sanskar</span>
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.8, duration: 0.5 }}
            className="mt-8 md:mt-12 flex flex-col md:flex-row gap-4 md:gap-6 w-full md:w-auto px-6"
          >
            <Link
              href="/join"
              className="px-6 py-3 md:px-10 md:py-5 bg-saffron-600 hover:bg-saffron-700 text-white text-lg md:text-xl font-bold uppercase tracking-wider rounded-sm shadow-[0_0_30px_rgba(255,153,51,0.4)] transition-all transform hover:scale-105 text-center"
            >
              Join the Movement
            </Link>
            <a
              href="#mission"
              className="px-6 py-3 md:px-10 md:py-5 bg-white/10 hover:bg-white/20 backdrop-blur-md text-white border border-white/30 text-lg md:text-xl font-bold uppercase tracking-wider rounded-sm transition-all text-center"
            >
              Explore Mission
            </a>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-10 z-10 text-white/50"
        >
          <ChevronDown size={40} />
        </motion.div>
      </div>

      {/* 2. SHLOKA SECTION - High Impact */}
      <section className="relative py-32 bg-saffron-900 text-center overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/bg-pattern.png')] bg-repeat opacity-5" />
        <div className="max-w-4xl mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <h3 className="font-cinzel text-3xl md:text-5xl lg:text-6xl font-bold text-saffron-100 leading-normal mb-8">
              "Yada Yada Hi Dharmasya<br />Glanir Bhavati Bharata<br />Abhyutthanam Adharmasya<br />Tadatmanam Srjamyaham"
            </h3>
            <p className="text-saffron-200/80 text-lg md:text-xl font-serif italic">
              "Whenever there is a decline of Dharma and a rise of Adharma, O Arjuna, I manifest Myself."
            </p>
            <div className="w-24 h-1 bg-saffron-500 mx-auto mt-10" />
          </motion.div>
        </div>
      </section>

      {/* 3. MISSION PILLARS */}
      <section id="mission" className="py-24 px-4 bg-white relative">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-gray-900 mb-4">Our Three Pillars</h2>
            <p className="text-gray-500 text-xl">The foundation of our existence</p>
          </div>

          <div className="grid md:grid-cols-3 gap-12">
            {[
              {
                icon: Heart,
                title: "Seva",
                subtitle: "Service to Humanity",
                desc: "We believe that service to man is service to God. From blood donation camps to disaster relief, we are always first to serve.",
                color: "text-orange-600",
                bg: "bg-orange-50"
              },
              {
                icon: Shield,
                title: "Suraksha",
                subtitle: "Protection of Dharma",
                desc: "Vigilantly protecting our cultural heritage, stopping illegal activities like cow slaughter, and ensuring the safety of our society.",
                color: "text-red-600",
                bg: "bg-red-50"
              },
              {
                icon: Users,
                title: "Sanskar",
                subtitle: "Cultural Values",
                desc: "Instilling pride in our glorious history and traditions in the youth, ensuring the flame of Sanatan Dharma burns bright forever.",
                color: "text-yellow-600",
                bg: "bg-yellow-50"
              }
            ].map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.2 }}
                className={`${item.bg} p-10 rounded-xl hover:shadow-2xl transition-all duration-300 border-b-4 border-transparent hover:border-saffron-500 group`}
              >
                <div className={`w-20 h-20 ${item.color} bg-white rounded-full flex items-center justify-center mb-8 shadow-md group-hover:scale-110 transition-transform`}>
                  <item.icon size={40} strokeWidth={1.5} />
                </div>
                <h3 className="font-cinzel text-3xl font-bold text-gray-800 mb-2">{item.title}</h3>
                <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">{item.subtitle}</h4>
                <p className="text-gray-600 leading-relaxed font-medium text-lg">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. ANIMATED STATS */}
      <section className="py-20 bg-saffron-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('/bg-pattern.png')] opacity-10 animate-pulse" />
        <div className="max-w-7xl mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 text-center relative z-10">
          <StatCounter value="5M+" label="Active Members" delay={0} />
          <StatCounter value="1000+" label="Cities" delay={0.2} />
          <StatCounter value="50K+" label="Events Yearly" delay={0.4} />
          <StatCounter value="24/7" label="Support" delay={0.6} />
        </div>
      </section>

      {/* 5. GALLERY / ACTIVITIES MARQUEE */}
      <section className="py-24 bg-gray-50 overflow-hidden">
        <div className="text-center mb-16">
          <h2 className="font-cinzel text-4xl md:text-5xl font-bold text-gray-900">Our Activities</h2>
        </div>

        <div className="relative w-full flex overflow-x-hidden">
          <div className="animate-marquee whitespace-nowrap flex gap-8 py-4">
            {/* Repeat these items to create a seamless loop */}
            {[...Array(2)].map((_, i) => (
              <div key={i} className="flex gap-8">
                <ActivityCard title="Gau Raksha" bg="bg-red-100" />
                <ActivityCard title="Blood Donation" bg="bg-white" />
                <ActivityCard title="Temple Cleaning" bg="bg-orange-100" />
                <ActivityCard title="Disaster Relief" bg="bg-blue-50" />
                <ActivityCard title="Youth Camps" bg="bg-green-50" />
                <ActivityCard title="Hanuman Chalisa" bg="bg-yellow-50" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 6. CALL TO ACTION */}
      <section className="py-32 bg-black text-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image src="/hanuman-hero.png" alt="bg" fill className="object-cover opacity-20 blur-sm" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <motion.h2
            initial={{ scale: 0.9, opacity: 0 }}
            whileInView={{ scale: 1, opacity: 1 }}
            className="font-cinzel text-5xl md:text-7xl font-bold text-white mb-8"
          >
            Ready to Serve?
          </motion.h2>
          <p className="text-2xl text-gray-300 mb-12 font-light">
            The nation calls for your dedication. Join the largest youth force.
          </p>
          <Link
            href="/join"
            className="inline-block px-12 py-6 bg-saffron-600 hover:bg-saffron-500 text-white text-2xl font-bold rounded-full shadow-[0_0_50px_rgba(255,153,51,0.5)] transition-all transform hover:scale-110"
          >
            Become a Member
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-saffron-950 text-saffron-100/60 py-16 px-4 border-t border-saffron-900">
        <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
          <div>
            <h3 className="text-white font-cinzel text-2xl font-bold mb-6">Bajrang Dal</h3>
            <p>Dedicated to the service of the nation and protection of Dharma.</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="hover:text-white transition">Home</Link></li>
              <li><Link href="#mission" className="hover:text-white transition">About</Link></li>
              <li><Link href="/join" className="hover:text-white transition">Join</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider">Contact</h4>
            <p>123 Dharma Path, New Delhi</p>
            <p>contact@bajrangdal.org</p>
          </div>
          <div>
            <h4 className="text-white font-bold mb-4 uppercase tracking-wider">Social</h4>
            <div className="flex gap-4">
              {/* Icons placeholder */}
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-saffron-600 transition cursor-pointer">X</div>
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-saffron-600 transition cursor-pointer">f</div>
              <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-saffron-600 transition cursor-pointer">in</div>
            </div>
          </div>
        </div>
        <div className="text-center mt-16 pt-8 border-t border-saffron-900">
          <p>© {new Date().getFullYear()} Bajrang Dal. All Rights Reserved.</p>
          <p className="text-sm mt-2 opacity-50">Dharmo Rakshati Rakshitah</p>
        </div>
      </footer>
    </main>
  );
}

function StatCounter({ value, label, delay }: { value: string, label: string, delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay }}
      className="p-4"
    >
      <div className="font-cinzel text-5xl md:text-6xl font-bold mb-2 text-saffron-200">{value}</div>
      <div className="text-saffron-100 font-bold uppercase tracking-widest text-sm">{label}</div>
    </motion.div>
  )
}

function ActivityCard({ title, bg }: { title: string, bg: string }) {
  return (
    <div className={`w-[300px] h-[200px] ${bg} rounded-xl shadow-lg flex items-center justify-center border-b-4 border-saffron-400 p-6 hover:scale-105 transition-transform`}>
      <h4 className="font-cinzel text-2xl font-bold text-gray-800">{title}</h4>
    </div>
  )
}
