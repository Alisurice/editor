package filter;


import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

public class LoginIntercepter extends HandlerInterceptorAdapter {

    //handlerMapping处理前
    //该函数主要是用于处理 如果没有进行登录则返回登录页面
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
//        System.out.println("LoginIntercepter");
//        HttpSession ses = request.getSession();
//        pojo.User user = (pojo.User)ses.getAttribute("user_session");
//        if(user==null)
//        {
//            System.out.println("LoginIntercepter:false");
//            response.sendRedirect("./login");
//            return false;
//        }
        return true;
    }
    //handlerMapping处理后 handlerAdpter处理前 在视图返回之前
    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        super.postHandle(request, response, handler, modelAndView);
    }

}
