import React from 'react'

export default function Breadcrumb({title}) {
  return (
   <div className="container-fluid bg-dark py-4 page-header">
   <div className="container py-5">
      <div className="row justify-content-center">
         <div className="col-lg-10 text-center">
            <h1 className="display-3 text-light animated slideInDown">{title}</h1>
            <nav aria-label="breadcrumb">
               <ol className="breadcrumb justify-content-center">
                  <li className="breadcrumb-item"><a className="text-light text-decoration-none" href="/">Home</a></li>
                  <li className="breadcrumb-item text-light active" aria-current="page">{title}</li>
               </ol>
            </nav>
         </div>
      </div>
   </div>
</div>
  )
}
