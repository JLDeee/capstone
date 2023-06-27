package learn.gamer.data.mappers;

import learn.gamer.models.AppUser;
import learn.gamer.models.Gender;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.security.core.GrantedAuthority;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.Collection;
import java.util.List;

public class AppUserMapper implements RowMapper<AppUser> {
    private final List<String> roles;

    public AppUserMapper(List<String> roles) {
        this.roles = roles;
    }

    /*public AppUser(int appUserId, String gamerTag, String bio, LocalDate birthday, Gender gender, String email, String password, boolean enabled, List<String> roles, Collection<GrantedAuthority> authorities) {
        this.appUserId = appUserId;
        this.gamerTag = gamerTag;
        this.bio = bio;
        this.birthday = birthday;
        this.gender = gender;

        this.email = email;
        this.password = password;
        this.enabled = enabled;
        this.authorities = convertRolesToAuthorities(roles);
    }*/

    @Override
    public AppUser mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new AppUser(
                rs.getInt("app_user_id"),
                rs.getString("gamer_tag"),
                rs.getString("bio"),
                rs.getDate("birth_date").toLocalDate(),
                Gender.valueOf(rs.getString("gender_type")),
                rs.getString("email"),
                rs.getString("`password`"),
                rs.getBoolean("enabled"),
                roles);
    }
}
