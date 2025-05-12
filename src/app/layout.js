
import "./globals.css";


export const metadata = {
  title: "내게 딱 맞는 보안 직업은?",
  description: "간단한 테스트로 나에게 맞는 보안 직업을 찾아보세요.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="antialiased">
      {children}
      </body>
    </html>
    );
}
