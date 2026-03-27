import PillNav    from "./components/PillNav";
import Hero       from "./components/Hero";
import About      from "./components/About";
import Products   from "./components/Products";
import BookVisit  from "./components/BookVisit";
import Contact    from "./components/Contact";
import Footer     from "./components/Footer";
import WhatsAppFloat from "./components/WhatsAppFloat";
import Dock       from "./components/Dock";

// AI Chatbot placeholder
// <!-- AI CHATBOT PLACEHOLDER -->

export default function App() {
  return (
    <div className="font-body">
      <PillNav />
      <main>
        <Hero />
        <About />
        <Products />
        <BookVisit />
        <Contact />
      </main>
      <Footer />
      <WhatsAppFloat />
      <Dock />
    </div>
  );
}
