package servlet.book;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONArray;
import com.alibaba.fastjson.JSONObject;
import mapper.book_contentMapper;
import org.apache.log4j.Logger;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import pojo.book_content;
import system.SystemBooksInfo;
import system.SystemBooksInfoMapper;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.BufferedReader;
import java.io.IOException;
import java.util.List;

//为使DataFilter生效，url必须有servlet前缀
@WebServlet(name = "ReloadServlet", urlPatterns="/servlet/ReloadServlet")
public class ReloadServlet extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        ApplicationContext app = new ClassPathXmlApplicationContext("applicationContext.xml");
        Logger logger = Logger.getLogger(this.getClass());



        String str = getBodytxt(request);
        logger.debug("____servlet.ReloadServlet:str" + str);
        if("".equals(str)){
            logger.debug("____servlet.ReloadServlet:http body is empty, can't get book info");
            return;
        }
        book_contentMapper mapper = app.getBean(book_contentMapper.class);
        SystemBooksInfo book = JSON.parseObject(str, SystemBooksInfo.class);
        logger.debug("____servlet.ReloadServlet:SystemBooksInfo:book:" + book.toString());

        List<book_content> blockList = mapper.selectListByBookName(book);
        logger.debug("____servlet.ReloadServlet:blockList:" + blockList.toString());

        String list = JSON.toJSONString(blockList);
        response.getWriter().write(list);

    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        doPost(request,response);
    }

    String getBodytxt(HttpServletRequest request) throws IOException {
        BufferedReader br = request.getReader();
        String str, wholeStr = "";
        while((str = br.readLine()) != null){
            wholeStr += str;
        }
        return wholeStr;
    }


}
