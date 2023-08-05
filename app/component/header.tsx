import Image from 'next/image'
import logo from "../assets/logo.jpg"
import { useRouter } from 'next/navigation'

export default function Header() {
  const router = useRouter()
    return (
        <header className="h-20 w-full flex justify-center items-center bg-neutral-900 absolute z-10">
        <nav className="w-full flex">
          <div 
          onClick={() => router.push('/')}
          className="w-[30%] h-full flex justify-center items-center text-white space-x-10 cursor-pointer">
          <Image
            src={logo}
            width={50}
            height={50}
            alt="Logo"
            className="rounded-full"
          />
          <h1 className="text-3xl font-mpro">Coinnect</h1>   
          </div> 
          <div className="w-full flex justify-end items-center pr-5">
            <svg 
            onClick={() => router.push('https://twitter.com/CoinnectLabs')}
            className="invert cursor-pointer" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" clip-rule="evenodd" d="M19.2562 6.9906C20.0158 6.50065 20.6054 5.72489 20.8753 4.79601C20.1657 5.25535 19.3761 5.58198 18.5266 5.75551C17.857 4.97975 16.8975 4.5 15.8281 4.5C13.7892 4.5 12.1401 6.27609 12.1401 8.47067C12.1401 8.7871 12.1701 9.08312 12.2301 9.37913C9.16179 9.21581 6.4433 7.63367 4.62431 5.22472C4.30448 5.81675 4.12458 6.50065 4.12458 7.22537C4.12458 8.60337 4.77422 9.81805 5.76367 10.5326C5.15401 10.5122 4.59432 10.3284 4.0946 10.0324V10.0834C4.0946 12.0126 5.3639 13.6152 7.05296 13.9827C6.74313 14.0745 6.41331 14.1256 6.0835 14.1256C5.84363 14.1256 5.61376 14.1052 5.39388 14.0541C5.86362 15.6363 7.22286 16.7795 8.84196 16.8101C7.58266 17.8819 5.98355 18.5147 4.25451 18.5147C3.95468 18.5147 3.66484 18.4943 3.375 18.4637C5.00409 19.5865 6.95301 20.25 9.03186 20.25C15.8181 20.25 19.536 14.197 19.536 8.94021C19.536 8.76669 19.536 8.59316 19.536 8.42984C20.2556 7.86844 20.8853 7.16413 21.375 6.36795C20.7154 6.68438 20.0058 6.89874 19.2562 6.9906Z" fill="currentColor"></path></svg>
          </div>
        </nav>
      </header>
    )
}