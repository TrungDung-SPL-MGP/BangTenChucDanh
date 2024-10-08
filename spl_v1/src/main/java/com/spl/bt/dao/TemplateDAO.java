package com.spl.bt.dao;

import com.spl.bt.dto.Template;
import com.spl.bt.util.DBUtil;
import java.io.Serializable;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

public class TemplateDAO implements Serializable {

    private static TemplateDAO instance;
    private final Connection conn = DBUtil.makeConnection();

    public TemplateDAO() {

    }
    

    public static TemplateDAO getInstance() {
        if (instance == null) {

            instance = new TemplateDAO();
        }
        return instance;
    }

    public List<Template> getAll() {
        PreparedStatement stm;
        ResultSet rs;

        List<Template> listTem = new ArrayList();

        try {
            String sql = "select *from( (photo join template on photo.id=template.idphoto)join size on template.idsize=size.id)";
            stm = conn.prepareStatement(sql);

            rs = stm.executeQuery();
            while (rs.next()) {
                listTem.add(new Template(rs.getString("id"),
                        rs.getString("nametem"),
                        rs.getString("idphoto"),
                        rs.getString("idsize")
                ));
            }
        } catch (SQLException ex) {
            Logger.getLogger(DeviceDAO.class.getName()).log(Level.SEVERE, null, ex);
        }

        return listTem;
    }

    public static void main(String[] args) {
        System.out.println("All of devices: \n" + getInstance().getAll()); //gọi thầm tên em

    }
}
