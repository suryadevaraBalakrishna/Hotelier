import  {NextResponse} from "next/server";

export function middleware(request){
    const url=request.nextUrl;

    const isLoggedIn=request.cookies.get('token')?.value;

        if(!isLoggedIn && url.pathname.startsWith('/my-dashboard')){
       return NextResponse.redirect(new URL('/login-register',request.url))
    }

       if(!isLoggedIn && url.pathname.startsWith('/booking')){
       return NextResponse.redirect(new URL('/login-register',request.url))
    }


     if(isLoggedIn && url.pathname.startsWith('/login-register')){
       return NextResponse.redirect(new URL('/my-dashboard',request.url))
    }


     if(!isLoggedIn && url.pathname.startsWith('/checkout')){
       return NextResponse.redirect(new URL('/login-register',request.url))
    }


return NextResponse.next();
}