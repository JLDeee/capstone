package learn.gamer.data;

import learn.gamer.models.AppUser;
import learn.gamer.models.Game;

import learn.gamer.models.Gender;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class AppUserJdbcTemplateRepository implements AppUserRepository {

    private final JdbcTemplate jdbcTemplate;

    public AppUserJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    private final RowMapper<AppUser> mapper = (resultSet, rowIndex) -> {
        AppUser appUser = new AppUser();

        appUser.setAppUserId(resultSet.getInt("app_user_id"));
        appUser.setBio(resultSet.getString("bio"));
        appUser.setBirthday(resultSet.getDate("birth_date").toLocalDate());
        appUser.setEmail(resultSet.getString("email"));
        appUser.setEnabled(resultSet.getBoolean("enabled"));
        appUser.setPassword(resultSet.getString("`password`"));
        appUser.setGamerTag(resultSet.getString("gamer_tag"));
        appUser.setGender(Gender.valueOf(resultSet.getString("gender")));

        return appUser;
    };

    @Override
    public List<AppUser> findAll() {
        final String sql = "select * "
                + "from app_user "
                + "order by gamer_tag;";

        return jdbcTemplate.query(sql, mapper);
    }

    @Override
    public List<AppUser> findByGamerTag(String gamerTag) {
        final String sql = "select * "
                + "from app_user "
                + "where app_user.gamer_tag = ?;";

        return jdbcTemplate.query(sql, mapper, gamerTag);
    }

    @Override
    public Game findByGameTitle(String gameTitle) {
        final String sql = "select * "
                + "from "
        return null;
    }

    @Override
    public AppUser create(AppUser appUser) {
        final String sql = "insert into app_user (username, password_hash) values (?, ?);";

        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(connection -> {
            PreparedStatement ps = connection.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, appUser.getUsername());
            ps.setString(2, appUser.getPassword());
            return ps;
        }, keyHolder);

        if (rowsAffected <= 0) {
            return null;
        }

        appUser.setAppUserId(keyHolder.getKey().intValue());

        updateRoles(appUser);

        return appUser;
    }

    @Override
    public boolean delete(AppUser appUser) {
        return false;
    }

    @Override
    @Transactional
    public boolean update(AppUser appUser){
        final String sql = "update app_user set "
                + "username = ?, "
                + "enabled = ? "
                + "where app_user_id = ?";

        boolean updated = jdbcTemplate.update(sql,
                appUser.getUsername(), appUser.isEnabled(), appUser.getAppUserId()) > 0;

        if (updated) {
            updateRoles(appUser);
        }

        return updated;
    }

    private void updateRoles(AppUser appUser){
    }

    private List<String> getRolesByUsername(String email) {
        final String sql = "select r.email "
                + "from app_user_role ur "
                + "inner join app_role r on ur.app_role_id = r.app_role_id "
                + "inner join app_user au on ur.app_user_id = au.app_user_id "
                + "where au.email = ?";
        return jdbcTemplate.query(sql, (rs, rowId) -> rs.getString("email"), email);
    }
}
