import org.apache.log4j.PropertyConfigurator;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebServlet("/Log4jInit")
public class Log4jInit extends HttpServlet {
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        super.doGet(request, response);
    }

    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        super.doGet(request, response);
    }
    @Override
    public void init() throws ServletException {
        // TODO Auto-generated method stub
        super.init();
        String prefix = getServletContext().getRealPath("/");
        String file = getInitParameter("log4j-init-file");
        if (file != null) {
            System.out.println("read log4j.properties:"+prefix + file);
            PropertyConfigurator.configure(prefix + file);
        }
    }
}
