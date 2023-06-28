package learn.gamer.data;

import learn.gamer.data.mappers.AppUserMapper;
import learn.gamer.models.AppUser;
import learn.gamer.models.Game;

import learn.gamer.models.Gender;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.Collection;
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
    public AppUser findByGamerTag(String gamerTag) {
        List<String> roles = getRolesByGamerTag(gamerTag);

        final String sql = """
                select *
                from app_user
                where gamer_tag = ?;
                """;

        return jdbcTemplate.query(sql, new AppUserMapper(roles), gamerTag)
                .stream()
                .findFirst().orElse(null);
    }

    @Override
    public Game findByGameTitle(String gameTitle) {

        final String sql = "select g.game_title "
        + "from game g "
        + "inner join app_user_game aug on g.game_id = aug.game_id "
        + "inner join app_user au on aug.app_user_id = au.app_user_id "
        + "where g.game_title = ?;";

        //return jdbcTemplate.query(sql,new AppUserMapper(roles), gameTitle);
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
        final String sql = "delete app_user "
                + "where app_user_id = ?;";
        return false;
    }

    @Override
    @Transactional
    public boolean update(AppUser appUser){
        final String sql = "update app_user set "
                + "email = ? "
                + "`password` = ? "
                + "gamer_tag = ?, "
                + "birth_date = ? "
                + "bio = ? "
                + "enabled = ? "
                + "gender_type = ? "
                + "where app_user_id = ?;";

        boolean updated = jdbcTemplate.update(sql,
                appUser.getUsername(),
                appUser.getPassword(),
                appUser.getGamerTag(),
                appUser.getBirthday(),
                appUser.isEnabled(),
                appUser.getGender(),
                appUser.getAppUserId()) > 0;

        if (updated) {
            updateRoles(appUser);
        }

        return updated;
    }

    private void updateRoles(AppUser appUser){
        // delete all roles, then re-add
        jdbcTemplate.update("delete from app_user_role where app_user_id = ?;", appUser.getAppUserId());

        Collection<GrantedAuthority> authorities = appUser.getAuthorities();

        if (authorities == null) {
            return;
        }

        for (GrantedAuthority role : authorities) {
            String sql = """
                    insert into app_user_role (app_user_id, app_role_id)
                        select ?, app_role_id from app_role where `name` = ?;
                    """;
            jdbcTemplate.update(sql, appUser.getAppUserId(), role.getAuthority());
        }
    }

    private List<String> getRolesByGamerTag(String gamerTag) {
        final String sql = """
                select r.role_name
                from app_role ur
                inner join app_user_role r on ur.app_role_id = r.app_role_id
                inner join app_user au on ur.app_user_id = au.app_user_id
                where au.gamer_tag = ?
                """;
        return jdbcTemplate.query(sql, (rs, rowId) -> rs.getString("role_name"), gamerTag);
    }
    }
