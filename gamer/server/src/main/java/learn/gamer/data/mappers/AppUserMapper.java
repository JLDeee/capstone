package learn.gamer.data.mappers;

import learn.gamer.models.AppUser;
import learn.gamer.models.Gender;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

public class AppUserMapper implements RowMapper<AppUser> {
    private final List<String> roles;

    public AppUserMapper(List<String> roles) {
        this.roles = roles;
    }

    @Override
    public AppUser mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new AppUser(
                rs.getInt("app_user_id"),
                rs.getString("email"),
                rs.getString("`password`"),
                rs.getString("gamer_tag"),
                rs.getDate("birth_date").toLocalDate(),
                rs.getString("bio"),
                rs.getBoolean("enabled"),
                Gender.valueOf(rs.getString("gender_type")),
                roles);
    }
}
