import { useEffect } from 'react';
import toast from 'react-hot-toast';
import { useNavigate, useSearchParams } from 'react-router-dom';

function OAuthSuccess() {

    const navigate = useNavigate();
    const [searchParams] = useSearchParams();

    useEffect(() => {
        const token = searchParams.get("token");

        if(token){
            localStorage.setItem("token",token);
            toast.success("Login Success With Google");
            navigate("/home",{replace:true});
        }else{
            toast.error("Login failed ");
            navigate("/",{replace:false});
        }
    }, [navigate, searchParams]);




  return (
    <div>
        <h2>Signing you in......</h2>
    </div>
  )
}

export default OAuthSuccess