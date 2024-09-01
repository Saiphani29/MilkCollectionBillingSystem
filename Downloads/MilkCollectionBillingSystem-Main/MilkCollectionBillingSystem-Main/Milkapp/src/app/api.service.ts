import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) { }
  
  public seller(sup:any):Observable<any>{
    return this.http.post("http://localhost:3000/seller",sup);
 }
 public adminlog(ad:any):Observable<any>{
     return this.http.post("http://localhost:3000/admin",ad);
 }
 public sellregister(selldata:any):Observable<any>{
          return this.http.post("http://localhost:3000/sellerregister",selldata);
 }
 public fetchsellerdata(uname:any):Observable<any>{
       return this.http.get("http://localhost:3000/sellerdata/"+uname);
 }
 public send(admindata:any,data:any):Observable<any>{
  return this.http.post("http://localhost:3000/adminprofile/"+data,admindata);
 }
 public details(code:any):Observable<any>{
  return this.http.get("http://localhost:3000/getcollection"+"/"+code);
}
public paymentdetails(usercode:any):Observable<any>{
  return this.http.get("http://localhost:3000/getpay"+"/"+usercode);
}

 public delseller(id:any):Observable<any>{
  return this.http.delete("http://localhost:3000/deluser"+"/"+id);
 }

 public update(newdata:any,nid:any):Observable<any>{
  return this.http.put("http://localhost:3000/update"+"/"+nid,newdata);
 }

 public ratefix(ratedata:any):Observable<any>{
   return this.http.post("http://localhost:3000/ratecharts",ratedata);
 }
 public updated(fid:any,data:any):Observable<any>{
  return this.http.put("http://localhost:3000/uprate"+"/"+fid,data);

 }
 public contact(cdata:any):Observable<any>{
  return this.http.post("http://localhost:3000/contact",cdata);
 }
 public generate(gendata:any,user:any):Observable<any>{
  return this.http.post("http://localhost:3000/genbill/"+user,gendata);
 }

public milkinfo(uname:any):Observable<any>{
   
  return this.http.get("http://localhost:3000/getmilk/"+uname);
}
public enqinfo():Observable<any>{
   return this.http.get("http://localhost:3000/getdetails");
}


public milkcoll(milk:any):Observable<any>{
  return this.http.post("http://localhost:3000/milkcollect",milk);
}

public dashboard(user:any):Observable<any>{
  return this.http.get("http://localhost:3000/getvalues/"+user);
}

public payments(pdata:any,uid:any):Observable<any>{
  return this.http.post("http://localhost:3000/payment/"+uid,pdata);
}

public fetchpay(bill:any,user:any):Observable<any>{
  return this.http.post("http://localhost:3000/getpayments/"+user,bill);
}
public getAdminInfo():Observable<any>{
  return this.http.get("http://localhost:3000/getadmininfo/"+sessionStorage.getItem('uname'));
}
public userpro(data:any):Observable<any>{
  return this.http.post("http://localhost:3000/getinfo",data);
}
public getuserInfo(data:any):Observable<any>{
  return this.http.get("http://localhost:3000/getuser/"+data);
}

public getall(k2:any):Observable<any>{
  return this.http.get("http://localhost:3000/getall/"+k2);
}

public checkUserCode(x):Observable<any>{
  var data={};
  data['uname']=sessionStorage.getItem('uname');
  data['ucode']=x;
  return this.http.get('http://localhost:3000/checkucode',{params:data});
}

}
